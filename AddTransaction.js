import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const AddTransaction = () => {
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [borrowerName, setBorrowerName] = useState("");
  const [transactionType, setTransactionType] = useState("Issued");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

  const validateForm = () => {
    const newErrors = {};
    if (!bookId.trim()) newErrors.bookId = "Book ID is required";
    if (!bookName.trim()) newErrors.bookName = "Book Name is required";
    if (!borrowerName.trim()) newErrors.borrowerName = "Borrower name is required";
    if (!fromDate) newErrors.fromDate = "From date is required";
    if (!toDate) newErrors.toDate = "To date is required";
    if (fromDate && toDate) {
      const from = moment(fromDate);
      const to = moment(toDate);
      if (to.isBefore(from)) {
        newErrors.toDate = "To date must be after from date";
      } else if (to.diff(from, 'days') > 14) {
          newErrors.toDate = "Issue period cannot exceed 14 days";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});
    if (!validateForm()) {
      setMessage("❌ Please fix the errors in the form");
      return;
    }
    setIsLoading(true);
    try {
      const formattedFromDate = moment(fromDate).format("MM/DD/YYYY");
      const formattedToDate = moment(toDate).format("MM/DD/YYYY");
      const transactionData = {
        bookId: bookId.trim(),
        bookName: bookName.trim(),
        borrowerName: borrowerName.trim(),
        transactionType,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      };
      const res = await axios.post(`${API_URL}api/transactions/add`, transactionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 201) {
        setMessage("✅ Transaction added successfully!");
        setBookId("");
        setBookName("");
        setBorrowerName("");
        setTransactionType("Issued");
        setFromDate("");
        setToDate("");
      }
    } catch (error) {
      if (error.response?.data?.details) {
        setErrors(error.response.data.details);
        setMessage("❌ Please fix the errors in the form");
      } else {
        setMessage(error.response?.data?.message || "❌ Failed to add transaction. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
    },
    card: {
      padding: "20px",
      maxWidth: "600px",
      margin: "20px auto",
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white background for content
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      color: "#1a237e", // Dark blue color
      marginBottom: "20px",
      fontSize: "1.8rem",
      fontWeight: "bold",
    },
    message: {
      textAlign: "center",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "20px",
      border: "1px solid",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#37474f", // Slightly lighter dark blue
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    select: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      backgroundColor: 'white',
    },
    button: {
      padding: "10px",
      backgroundColor: "#1a237e", // Dark blue button
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1.1rem",
      marginTop: "10px",
      transition: "background-color 0.3s ease",
    },
    error: {
      color: "#d32f2f", // Red color for errors
      fontSize: "0.8rem",
      marginTop: "5px",
    },
  };

  return (
    <div style={styles.container}> 
      <div style={styles.card}> 
        <h2 style={styles.title}>📘 Add Transaction</h2>
        {message && (
          <p style={{
            ...styles.message,
            color: message.includes("✅") ? "#2e7d32" : "#d32f2f",
            backgroundColor: message.includes("✅") ? "#e8f5e9" : "#ffebee"
          }}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>🔢 Book ID:</label>
            <input
              type="text"
              value={bookId}
              onChange={e => setBookId(e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: errors.bookId ? '#d32f2f' : '#ccc',
                backgroundColor: errors.bookId ? '#ffebee' : 'white'
              }}
              placeholder="Enter book ID"
            />
            {errors.bookId && <p style={styles.error}>{errors.bookId}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>📖 Book Name:</label>
            <input
              type="text"
              value={bookName}
              onChange={e => setBookName(e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: errors.bookName ? '#d32f2f' : '#ccc',
                backgroundColor: errors.bookName ? '#ffebee' : 'white'
              }}
              placeholder="Enter book name"
            />
            {errors.bookName && <p style={styles.error}>{errors.bookName}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>👤 Borrower Name:</label>
            <input
              type="text"
              value={borrowerName}
              onChange={e => setBorrowerName(e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: errors.borrowerName ? '#d32f2f' : '#ccc',
                backgroundColor: errors.borrowerName ? '#ffebee' : 'white'
              }}
              placeholder="Enter borrower name"
            />
            {errors.borrowerName && <p style={styles.error}>{errors.borrowerName}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>🔁 Transaction Type:</label>
            <select
              value={transactionType}
              onChange={e => setTransactionType(e.target.value)}
              style={{
                ...styles.select,
                borderColor: errors.transactionType ? '#d32f2f' : '#ccc',
                backgroundColor: errors.transactionType ? '#ffebee' : 'white'
              }}
            >
              <option value="Issued">Issue</option>
              <option value="Reserved">Reserve</option>
            </select>
            {errors.transactionType && <p style={styles.error}>{errors.transactionType}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>📅 From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: errors.fromDate ? '#d32f2f' : '#ccc',
                backgroundColor: errors.fromDate ? '#ffebee' : 'white'
              }}
            />
            {errors.fromDate && <p style={styles.error}>{errors.fromDate}</p>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>📅 To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: errors.toDate ? '#d32f2f' : '#ccc',
                backgroundColor: errors.toDate ? '#ffebee' : 'white'
              }}
            />
            {errors.toDate && <p style={styles.error}>{errors.toDate}</p>}
          </div>
          <button
            className="transaction-form-submit"
            type="submit"
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div> 
    </div>
  );
};

export default AddTransaction;
