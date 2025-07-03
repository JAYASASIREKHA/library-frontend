import React from 'react';
import './ImageSlider.css';
import { Carousel } from 'react-bootstrap';

function ImageSlider() {
  return (
    <div className='slider'>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQQHwLQJtaDb5RWKQEn0SvmnkccCweKJSaw&s"
            alt="Library Slide 1"
          />
          <Carousel.Caption>
            <h3>Library Books</h3>
            <p>Discover a world of knowledge on every shelf.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1535905748047-14b2415c7a7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
            alt="Library Slide 2"
          />
          <Carousel.Caption>
            <h3>Reading Area</h3>
            <p>Relax and read in a cozy library setting.</p>
          </Carousel.Caption>
        </Carousel.Item> */}

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
            alt="Library Slide 3"
          />
          <Carousel.Caption>
            <h3>Modern Library</h3>
            <p>Innovative spaces for collaborative learning.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ImageSlider;
