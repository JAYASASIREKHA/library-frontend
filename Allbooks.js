import React from "react";
import "./Allbooks.css";

function Allbooks() {
  return (
    <div className="books-page">
      <div className="books">
        <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp16xiXu1ZtTzbLy-eSwEK4Ng6cUpUZnuGbQ&usqp=CAU"
            alt=""
          ></img>
          <p className="bookcard-title">Wings Of Fire</p>
          <p className="bookcard-author">By Pranavdhar</p>
          <div className="bookcard-category">
            <p>Auto Biography</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>
        <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU"
            alt=""
          ></img>
          <p className="bookcard-title">The Power Of Your Subconscious Mind</p>
          <p className="bookcard-author">By Joseph</p>
          <div className="bookcard-category">
            <p>Psychology</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>
        <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFiDRQ7a-Oo-CnMmnbIMApP1Cq9B5bYx-UA&usqp=CAU"
            alt=""
          ></img>
          <p className="bookcard-title">Elon Musk</p>
          <p className="bookcard-author">By Elon</p>
          <div className="bookcard-category">
            <p>Auto Biography</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>
        <div className="book-card">
          <img
            src="https://popupkids.in/cdn/shop/products/9788131915592.jpg?v=1663658523"
            alt=""
          ></img>
          <p className="bookcard-title">Cinderella</p>
          <p className="bookcard-author">Charles Perrault </p>
          <div className="bookcard-category">
            <p>Story</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>
      </div>
    </div>
  );
}

export default Allbooks;
