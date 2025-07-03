import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../AdminDashboard.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({
    bookName: '',
    authorName: '',
    copies: ''
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/';

  const fetchBooks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}api/books`);
      setBooks(res.data);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleEdit = (book) => {
    setEditingBook(book);
    setEditForm({
      bookName: book.bookName,
      authorName: book.authorName,
      copies: book.copies
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting to update book with ID:', editingBook._id);
    console.log('Sending data:', editForm);
    try {
      const response = await axios.put(`${API_URL}api/books/${editingBook._id}`, {
        bookName: editForm.bookName,
        authorName: editForm.authorName,
        copies: editForm.copies,
        category: editingBook.category // Preserve the existing category
      });
      
      if (response.status === 200) {
        setEditingBook(null);
        fetchBooks(); // Refresh the book list
        alert('Book updated successfully!');
      }
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Failed to update book: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (book) => {
    if (!book._id) {
      setError('Invalid book ID');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete book "${book.bookName}"?`)) {
      try {
        await axios.delete(`${API_URL}api/books/${book._id}`);
        fetchBooks(); // Refresh the book list
        alert('Book deleted successfully!');
      } catch (err) {
        console.error('Error deleting book:', err);
        setError('Failed to delete book');
      }
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>All Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <table className="admindashboard-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Author Name</th>
                <th>Copies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, idx) => (
                <tr key={idx}>
                  <td>{book.bookId}</td>
                  <td>{book.bookName}</td>
                  <td>{book.authorName}</td>
                  <td>{book.copies}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(book)}
                      className="action-button edit"
                      title="Edit"
                    >
                      <EditIcon />
                    </button>
                    <button 
                      onClick={() => handleDelete(book)}
                      className="action-button delete"
                      title="Delete"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editingBook && (
            <div className="edit-modal">
              <div className="edit-modal-content">
                <h3>Edit Book</h3>
                <form onSubmit={handleEditSubmit}>
                  <div className="form-group">
                    <label>Book Name</label>
                    <input
                      type="text"
                      value={editForm.bookName}
                      onChange={(e) => setEditForm({...editForm, bookName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Author Name</label>
                    <input
                      type="text"
                      value={editForm.authorName}
                      onChange={(e) => setEditForm({...editForm, authorName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Copies</label>
                    <input
                      type="number"
                      value={editForm.copies}
                      onChange={(e) => setEditForm({...editForm, copies: e.target.value})}
                      required
                    />
                  </div>
                  <div className="edit-modal-buttons">
                    <button type="submit" className="save-button">Save Changes</button>
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => setEditingBook(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllBooks; 