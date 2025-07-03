import React from 'react';
import './About.css';

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">About the Library</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=913&q=80" alt="Library" />
                </div>
                <div>
                    <p className="about-text">
                        Welcome to our library! We are a community hub that provides access to a vast range of resources for learning, research, and entertainment. Our library serves students, professionals, and lifelong learners by offering an extensive collection of books, digital media, and educational tools.<br/>
                        <br/>
                        Our mission is to foster a love for reading, learning, and discovery. We aim to support the educational and intellectual growth of our community by providing a welcoming and inclusive environment for all.<br/>
                        <br/>
                        In addition to traditional books, our library offers access to a wide variety of resources, including:<br/>
                        Digital Books and Audiobooks<br/>
                            Research Journals and Articles<br/>
                            Study Rooms and Computer Access<br/>
                            Workshops and Events for All Ages
                        <br/>
                        We believe that libraries are more than just a place to borrow books—they are places of connection, inspiration, and creativity. Whether you're looking for information for a research project, browsing for your next great read, or attending one of our community events, our library is here to support you.<br/>
                        <br/>
                        Our dedicated staff is always available to help you find the resources you need, and we're committed to providing a safe, accessible, and enriching environment for all visitors.<br/>
                        <br/>
                        Your suggestions for improvement are always welcome! Together, we can make the library a better place for everyone.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
