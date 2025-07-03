import React, { useEffect, useState } from 'react';
import "../AdminDashboard.css";
import axios from "axios";
import { Dropdown } from 'semantic-ui-react';
import '../../MemberDashboard/MemberDashboard.css';
import moment from "moment";

function GetMember() {
    const API_URL = process.env.REACT_APP_API_URL;

    const [allMembersOptions, setAllMembersOptions] = useState([]);
    const [memberId, setMemberId] = useState(null);
    const [memberDetails, setMemberDetails] = useState(null);
    const [loadingMembers, setLoadingMembers] = useState(true);

    // Fetch All Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(`${API_URL}api/users/allmembers`);
                console.log("Fetched members:", response.data);

                const options = response.data.map((member) => ({
                    value: member?._id,
                    text: member?.userType === "Student"
                        ? `${member?.userFullName} [${member?.admissionId}]`
                        : `${member?.userFullName} [${member?.employeeId}]`
                }));

                console.log("Dropdown options:", options);
                setAllMembersOptions(options);
                setLoadingMembers(false);
            } catch (err) {
                console.error("Error fetching members:", err);
                setLoadingMembers(false);
            }
        };
        getMembers();
    }, [API_URL]);

    // Fetch selected member's details
    useEffect(() => {
        const getMemberDetails = async () => {
            if (memberId) {
                try {
                    const response = await axios.get(`${API_URL}api/users/getuser/${memberId}`);
                    console.log("Fetched member details:", response.data);
                    setMemberDetails(response.data);
                } catch (err) {
                    console.error("Error fetching member details:", err);
                }
            }
        };
        getMemberDetails();
    }, [API_URL, memberId]);

    return (
        <div>
            <div className='semanticdropdown getmember-dropdown'>
                {loadingMembers ? (
                    <p>Loading members...</p>
                ) : (
                    <Dropdown
                        placeholder='Select Member'
                        fluid
                        search
                        selection
                        value={memberId}
                        options={allMembersOptions || []}
                        onChange={(event, data) => {
                            setMemberId(data.value);
                            setMemberDetails(null);
                        }}
                    />
                )}
            </div>

            {memberId && memberDetails && (
                <>
                    <div className="member-profile-content" id="profile@member">
                        <div className="user-details-topbar">
                            <img className="user-profileimage" src="./assets/images/Profile.png" alt="Profile" />
                            <div className="user-info">
                                <p className="user-name">{memberDetails.userFullName}</p>
                                <p className="user-id">{memberDetails.userType === "Student" ? memberDetails.admissionId : memberDetails.employeeId}</p>
                                <p className="user-email">{memberDetails.email}</p>
                                <p className="user-phone">{memberDetails.mobileNumber}</p>
                            </div>
                        </div>

                        <div className="user-details-specific">
                            <div className="specific-left">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p style={{ flex: "0.5", flexDirection: "column" }}>
                                        <b>Age</b>
                                        <span>{memberDetails.age}</span>
                                    </p>
                                    <p style={{ flex: "0.5", flexDirection: "column" }}>
                                        <b>Gender</b>
                                        <span>{memberDetails.gender}</span>
                                    </p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                                    <p style={{ flex: "0.5", flexDirection: "column" }}>
                                        <b>DOB</b>
                                        <span>{memberDetails.dob}</span>
                                    </p>
                                    <p style={{ flex: "0.5", flexDirection: "column" }}>
                                        <b>Address</b>
                                        <span>{memberDetails.address}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="specific-right">
                                <div style={{ flex: "0.5", textAlign: "center" }}>
                                    <p><b>Points</b></p>
                                    <p style={{ fontSize: "25px", fontWeight: "500" }}>540</p>
                                </div>
                                <div className="dashboard-title-line"></div>
                                <div style={{ flex: "0.5", textAlign: "center" }}>
                                    <p><b>Rank</b></p>
                                    <p style={{ fontSize: "25px", fontWeight: "500" }}>{memberDetails.points}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="member-activebooks-content" id="activebooks@member">
                        <p className="section-title">Issued</p>
                        <table className="activebooks-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Book Name</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Fine</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberDetails?.activeTransactions?.filter(t => t.transactionType === "Issued").map((t, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{t.bookName}</td>
                                        <td>{t.fromDate}</td>
                                        <td>{t.toDate}</td>
                                        <td>{Math.max(0, Math.floor((Date.parse(moment().format("MM/DD/YYYY")) - Date.parse(t.toDate)) / 86400000)) * 10}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="member-reservedbooks-content" id="reservedbooks@member">
                        <p className="section-title">Reserved</p>
                        <table className="activebooks-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Book Name</th>
                                    <th>From</th>
                                    <th>To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberDetails?.activeTransactions?.filter(t => t.transactionType === "Reserved").map((t, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{t.bookName}</td>
                                        <td>{t.fromDate}</td>
                                        <td>{t.toDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="member-history-content" id="history@member">
                        <p className="section-title">History</p>
                        <table className="activebooks-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Book Name</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Return Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberDetails?.prevTransactions?.map((t, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{t.bookName}</td>
                                        <td>{t.fromDate}</td>
                                        <td>{t.toDate}</td>
                                        <td>{t.returnDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default GetMember;
