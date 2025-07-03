import React, { useEffect, useState } from 'react'
import './ReservedBooks.css'
import axios from 'axios'

function ReservedBooks() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/"
                const response = await axios.get(`${API_URL}api/transactions`)
                // Filter for Reserved or Issued transactions
                const filteredTransactions = response.data.filter(txn =>
                    txn.transactionType === "Reserved" || txn.transactionType === "Issued"
                )
                setTransactions(filteredTransactions)
            } catch (err) {
                console.error("Error fetching transactions:", err)
            }
        }

        fetchTransactions()
    }, []) // Empty dependency array means this runs once on mount

    return (
        <div className='reservedbooks-container'>
            <h2 className='reservedbooks-title'>Books On Hold & Issued</h2>
            <table className='reservedbooks-table'>
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Borrower</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((txn, index) => (
                            <tr key={txn._id || index}> {/* Use _id as key if available */} 
                                <td>{txn.bookName}</td>
                                <td>{txn.borrowerName}</td>
                                <td>{txn.fromDate}</td>
                                <td>{txn.toDate}</td>
                                <td>{txn.transactionStatus}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No reserved or issued books found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ReservedBooks
