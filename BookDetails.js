import React, { useState } from 'react';
import axios from 'axios';
import '../AdminDashboard.css';

function BookDetails() {
    const [bookId, setBookId] = useState('');
    const [bookDetails, setBookDetails] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setBookDetails(null);
        setLoading(true);

        try {
            const response = await axios.get(`${API_URL}api/books/${bookId}/details`);
            setBookDetails(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch book details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 900, margin: "30px auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Book Details</h2>
            
            <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <input
                        type="text"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        placeholder="Enter Book ID"
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            width: "200px"
                        }}
                        required
                    />
                    <button
                        type="submit"
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#18213e",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            {error && (
                <div style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>
                    {error}
                </div>
            )}

            {bookDetails && (
                <div>
                    <div style={{ marginBottom: 20, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                        <h3>Book Information</h3>
                        <p><strong>Book ID:</strong> {bookDetails.book.bookId}</p>
                        <p><strong>Book Name:</strong> {bookDetails.book.bookName}</p>
                        <p><strong>Author:</strong> {bookDetails.book.authorName}</p>
                        <p><strong>Available Copies:</strong> {bookDetails.book.copies}</p>
                    </div>

                    {bookDetails.transactions.length > 0 ? (
                        <div>
                            <h3>Current Borrowers</h3>
                            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
                                <thead>
                                    <tr style={{ background: "#18213e", color: "#fff" }}>
                                        <th style={{ padding: "12px", textAlign: "center" }}>Borrower Name</th>
                                        <th style={{ padding: "12px", textAlign: "center" }}>From Date</th>
                                        <th style={{ padding: "12px", textAlign: "center" }}>To Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookDetails.transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: "12px", textAlign: "center" }}>{transaction.borrowerName}</td>
                                            <td style={{ padding: "12px", textAlign: "center" }}>{new Date(transaction.fromDate).toLocaleDateString()}</td>
                                            <td style={{ padding: "12px", textAlign: "center" }}>{new Date(transaction.toDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#757575' }}>No current borrowers for this book.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default BookDetails; 