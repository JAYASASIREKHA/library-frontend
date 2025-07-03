import React from 'react';
import { Link } from 'react-router-dom';
import './RecentAddedBooks.css';

const bookData = [
  {
    id: '1',
    imageUrl: 'https://inkinmytea.files.wordpress.com/2011/12/apj.jpg?w=640',
    title: 'Wings of Fire'
  },
  {
    id: '2',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91VokXkn8hL.jpg',
    title: 'The Alchemist'
  },
  {
    id: '3',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg',
    title: 'Elon Musk'
  },
  {
    id: '4',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg',
    title: 'The Power of Your Subconscious Mind'
  },
  {
    id: '5',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71t4GuxLCuL.jpg',
    title: 'The Subtle Art of Not Giving a F*ck'
  },
  {
    id: '6',
    imageUrl: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105',
    title: 'Thriller Book Example'
  },
  {
    id: '7',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81mXQdi5x+L.jpg',
    title: 'Another Book Title'
  },
  {
    id: '8',
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1498813353l/34267304.jpg',
    title: 'Book with long title example'
  },
];

function RecentAddedBooks() {
  return (
    <div className="recentaddedbooks-container">
      <h2 className="recentbooks-title">Recent Uploads</h2>
      <div className="recentbooks">
        {bookData.map((book) => (
          <div className="recent-book" key={book.id}>
            <img className="book-image" src={book.imageUrl} alt={`Book ${book.title}`} />
            <div className="buttons-container">
              <a 
                href={`https://www.amazon.com/s/?field-keywords=${encodeURIComponent(book.title)}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="buy-btn">Buy</button>
              </a>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentAddedBooks;
