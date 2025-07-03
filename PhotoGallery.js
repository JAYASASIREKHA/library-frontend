import React from 'react';
import './PhotoGallery.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router-dom';  // Import useHistory for navigation

function PhotoGallery() {
    const history = useHistory(); // Use the history hook

    const books = [
        { title: 'The Catcher in the Rye', imageUrl: 'https://covers.openlibrary.org/b/id/8135341-L.jpg' },
        { title: 'Pride and Prejudice', imageUrl: 'https://covers.openlibrary.org/b/id/8135338-L.jpg' },
        { title: 'The Great Gatsby', imageUrl: 'https://covers.openlibrary.org/b/id/8250771-L.jpg' },
        { title: 'Moby-Dick', imageUrl: 'https://covers.openlibrary.org/b/id/8237235-L.jpg' },
        { title: 'Jane Eyre', imageUrl: 'https://covers.openlibrary.org/b/id/8237312-L.jpg' },
        { title: 'War and Peace', imageUrl: 'https://covers.openlibrary.org/b/id/8311000-L.jpg' },
        { title: 'The Odyssey', imageUrl: 'https://covers.openlibrary.org/b/id/8146021-L.jpg' },
        { title: 'Crime and Punishment', imageUrl: 'https://covers.openlibrary.org/b/id/8325579-L.jpg' },
        { title: 'Don Quixote', imageUrl: 'https://covers.openlibrary.org/b/id/8286479-L.jpg' },
        { title: 'Brave New World', imageUrl: 'https://covers.openlibrary.org/b/id/8219154-L.jpg' }
    ];

    // Function to handle the click event and navigate to a new page
    const handleViewMoreClick = () => {
        history.push('/books'); // This will redirect to the '/book-details' page
    };

    return (
        <div className='photogallery-container'>
            <h1 className='photogallery-title'>Library Photo Gallery</h1>
            <div className="photogallery-images">
                {books.map((book, index) => (
                    <img
                        key={index}
                        src={book.imageUrl}
                        alt={book.title}
                        className="book-image"
                    />
                ))}
            </div>
            <button className="view-more-btn" onClick={handleViewMoreClick}>
                VIEW MORE <ArrowForwardIosIcon style={{ fontSize: 18 }} />
            </button>
        </div>
    );
}

export default PhotoGallery;
