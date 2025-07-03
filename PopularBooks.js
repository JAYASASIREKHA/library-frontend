import React from "react";
import "./PopularBooks.css";

function PopularBooks() {
  const bookImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU",
    // Add more if needed
  ];

  return (
    <div className="popularbooks-container">
      <h2 className="popularbooks-title">Popular Books</h2>
      <div className="popularbooks-grid">
        {bookImages.map((img, index) => (
          <img key={index} className="popular-book" src={img} alt={`Book ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default PopularBooks;
