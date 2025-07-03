import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import "../AdminDashboard.css"

const AddBook = () => {
  const [bookId, setBookId] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [copies, setCopies] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const dropdownRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

  const categories = [
    { key: 'fiction', text: 'Fiction', value: 'Fiction' },
    { key: 'non-fiction', text: 'Non-Fiction', value: 'Non-Fiction' },
    { key: 'science', text: 'Science', value: 'Science' },
    { key: 'history', text: 'History', value: 'History' },
    { key: 'biography', text: 'Biography', value: 'Biography' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!bookId.trim()) {
      alert("Book ID is required!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_URL + "api/books/add", {
        bookId: bookId.trim(),
        bookName,
        authorName,
        category,
        copies: parseInt(copies),
        bookCountAvailable: parseInt(copies)
      });

      if (response.status === 201) {
        alert("Book added successfully!");
        setBookId('');
        setBookName('');
        setAuthorName('');
        setCategory('');
        setCopies('');
        fetchBooks();
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL + "api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="add-book-container" style={{ display: 'flex', gap: '40px', maxWidth: '1000px', margin: '20px auto' }}>
      <div style={{ flex: 1 }}> {/* Left side for the form */} 
        <h2>Add a Book</h2>
        <form onSubmit={handleSubmit}>
          <div className='semanticdropdown'>
            <Dropdown
              ref={dropdownRef}
              placeholder='Select Category'
              fluid
              selection
              options={categories}
              value={category}
              onChange={(e, data) => setCategory(data.value)}
            />
          </div>
          <label className="addbook-form-label">Book ID<span className="required-field">*</span></label><br />
          <input 
            className="addbook-form-input" 
            type="text" 
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
            placeholder="Enter Book ID (e.g. 1234)"
          /><br />
          <label className="addbook-form-label">Book Name<span className="required-field">*</span></label><br />
          <input 
            className="addbook-form-input" 
            type="text" 
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required 
          /><br />

          <label className="addbook-form-label">Author Name<span className="required-field">*</span></label><br />
          <input 
            className="addbook-form-input" 
            type="text" 
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required 
          /><br />

          <label className="addbook-form-label">Number of Copies<span className="required-field">*</span></label><br />
          <input 
            className="addbook-form-input" 
            type="number" 
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
            required 
          /><br />

          <input 
            className="addbook-submit" 
            type="submit" 
            value={isLoading ? "Adding..." : "SUBMIT"} 
            disabled={isLoading} 
          />
        </form>
      </div>

      <div style={{ flex: 1 }}> {/* Right side for recently added books */} 
        <h3>Recently Added Books</h3>
        {books.length === 0 ? (
          <p>No recent books found.</p>
        ) : (
          <table className="admindashboard-table"> {/* Using admindashboard-table class for styling */} 
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Author Name</th>
                <th>Copies</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id || index}> {/* Use _id as key if available */} 
                  <td>{book.bookId}</td>
                  <td>{book.bookName}</td>
                  <td>{book.authorName}</td>
                  <td>{book.copies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddBook;
