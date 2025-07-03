import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'
import '../../MemberDashboard/MemberDashboard.css'
import moment from "moment"
import { AuthContext } from '../../../../Context/AuthContext'


function Return() {

    const API_URL = process.env.REACT_APP_API_URL
    const { user } = useContext(AuthContext)

    const [allTransactions, setAllTransactions] = useState([])
    const [ExecutionStatus, setExecutionStatus] = useState(null) /* For triggering the tabledata to be updated */ 

    const [allMembersOptions, setAllMembersOptions] = useState(null)
    const [borrowerId, setBorrowerId] = useState(null)
    const [bookIdFilter, setBookIdFilter] = useState("");


    //Fetching all Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers")
                setAllMembersOptions(response.data.map((member) => (
                    { value: `${member?._id}`, text: `${member?.userType === "Student" ? `${member?.userFullName}[${member?.admissionId}]` : `${member?.userFullName}[${member?.employeeId}]`}` }
                )))
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])


    /* Getting all active transactions */
    useEffect(()=>{
        const getAllTransactions = async () =>{
            try{
                const response = await axios.get(API_URL+"api/transactions")
                setAllTransactions(response.data.sort((a, b) => Date.parse(a.toDate) - Date.parse(b.toDate)).filter((data) => {
                    return data.transactionStatus === "Active"
                }))
                console.log("Okay")
                setExecutionStatus(null)
            }
            catch(err){
                console.log(err)
            }
        }
        getAllTransactions()
    },[API_URL,ExecutionStatus])


    const returnBook = async (transactionId,borrowerId,bookId,due) =>{
        try{
            /* Setting return date and transactionStatus to completed */
            await axios.put(API_URL+"api/transactions/"+transactionId,{
                isAdmin:user.isAdmin,
                transactionStatus:"Completed",
                returnDate:moment(new Date()).format("MM/DD/YYYY")
            })

            /* Getting borrower points alreadt existed */
            const borrowerdata = await axios.get(API_URL+"api/users/getuser/"+borrowerId)
            const points = borrowerdata.data.points

            /* If the number of days after dueDate is greater than zero then decreasing points by 10 else increase by 10*/
            if(due > 0){
                await axios.put(API_URL+"api/users/"+borrowerId,{
                    points:points-10,
                    isAdmin: user.isAdmin
                })
            }
            else if(due<=0){
                await axios.put(API_URL+"api/users/"+borrowerId,{
                    points:points+10,
                    isAdmin: user.isAdmin
                })
            }

            const book_details = await axios.get(API_URL+"api/books/"+bookId)
            await axios.put(API_URL+"api/books/"+bookId,{
                isAdmin:user.isAdmin,
                bookCountAvailable:book_details.data.bookCountAvailable + 1
            })

            /* Pulling out the transaction id from user active Transactions and pushing to Prev Transactions */
            await axios.put(API_URL + `api/users/${borrowerId}/transactions/${transactionId}`, {
                isAdmin: user.isAdmin
            })

            setExecutionStatus("Completed");
            alert("Book returned to the library successfully")
        }
        catch(err){
            console.log(err)
        }
    }

    const convertToIssue = async (transactionId) => {
        try{
            await axios.put(API_URL+"api/transactions/"+transactionId,{
                transactionType:"Issued",
                isAdmin:user.isAdmin
            })
            setExecutionStatus("Completed");
            alert("Book issued succesfully 🎆")
        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <div style={{ display: 'flex', gap: '40px', maxWidth: '1200px', margin: '20px auto' }}> {/* Main container for two columns */}
            <div style={{ flex: 1 }}> {/* Left column */} 
                <h2 style={{ textAlign: "center", marginBottom: 20 }}>Issued Books</h2> {/* Changed title */} 
                <div style={{ marginBottom: 20 }}>
                    <label>
                        Enter Book ID:&nbsp;
                        <input
                            type="text"
                            value={bookIdFilter}
                            onChange={e => setBookIdFilter(e.target.value)}
                            placeholder="Book ID"
                            style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
                        />
                    </label>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
                    <thead>
                        <tr style={{ background: "#18213e", color: "#fff" }}>
                            <th style={thStyle}>Book Name</th>
                            <th style={thStyle}>Book ID</th>
                            <th style={thStyle}>Borrower Name</th>
                            <th style={thStyle}>From Date</th>
                            <th style={thStyle}>To Date</th>
                            <th style={thStyle}>Fine</th>
                            <th style={thStyle}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTransactions
                            .filter((txn) => {
                                const matchesBook = !bookIdFilter || txn.bookId === bookIdFilter;
                                if (borrowerId === null) {
                                    return matchesBook && txn.transactionType === "Issued" && txn.transactionStatus === "Active";
                                } else {
                                    return (
                                        matchesBook &&
                                        txn.transactionType === "Issued" &&
                                        txn.transactionStatus === "Active" &&
                                        txn.borrowerId === borrowerId
                                    );
                                }
                            })
                            .map((txn) => {
                                const dueDate = moment(txn.toDate, "MM/DD/YYYY");
                                const overdueDays = Math.max(0, moment().diff(dueDate, "days"));
                                const fine = overdueDays * 10; // 10 is the fine per day
                                return (
                                    <tr key={txn._id} style={{ textAlign: "center" }}>
                                        <td style={tdStyle}>{txn.bookName}</td>
                                        <td style={tdStyle}>{txn.bookId}</td>
                                        <td style={tdStyle}>{txn.borrowerName}</td>
                                        <td style={tdStyle}>{txn.fromDate}</td>
                                        <td style={tdStyle}>{txn.toDate}</td>
                                        <td style={tdStyle}>{fine}</td>
                                        <td style={tdStyle}>
                                            <button
                                                style={buttonStyle}
                                                onClick={() => returnBook(txn._id, txn.borrowerId, txn.bookId, overdueDays)}
                                            >
                                                Return
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <div className='semanticdropdown returnbook-dropdown'>
                    <Dropdown
                        placeholder='Select Member'
                        fluid
                        search
                        selection
                        value={borrowerId}
                        options={allMembersOptions}
                        onChange={(event, data) => setBorrowerId(data.value)}
                    />
                </div>
            </div>

            <div style={{ flex: 1 }}> {/* Right column */} 
                <h2 className="dashboard-option-title">Reserved Books</h2> {/* Changed title */} 
                <table className="admindashboard-table">
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Borrower Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTransactions?.filter((data)=>{
                            if(borrowerId === null){
                                return data.transactionType === "Reserved"
                            }
                            else{
                                return data.borrowerId === borrowerId && data.transactionType === "Reserved"
                            }
                        }).map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.bookName}</td>
                                    <td>{data.borrowerName}</td>
                                    <td>{data.fromDate}</td>
                                    <td>{data.toDate}</td>
                                    <td><button onClick={()=>{convertToIssue(data._id)}}>Convert</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const thStyle = {
    padding: "12px 8px",
    border: "1px solid #ddd",
    fontSize: 16,
};
const tdStyle = {
    padding: "10px 8px",
    border: "1px solid #ddd",
    fontSize: 15,
};
const buttonStyle = {
    padding: "6px 16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: 600,
};

export default Return
