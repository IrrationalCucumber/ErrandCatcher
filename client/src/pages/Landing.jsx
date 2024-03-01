import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import "./Landing.css";

const Landing = () => {

    return (
        <>
            <NavBar />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

            <div className="home">
                <div className="content">
                    <img src="./images/tawo.png" alt=""/>
                </div>
                <div className="content">
                    <h1>Your <span>Errand Service</span> Website</h1>
                 <p>Errand Catchers offer a convenient solution for individuals requiring assistance with various tasks and chores. Whether it involves grocery shopping, picking up prescriptions, mailing packages, or managing daily errands, these services focus on saving time and streamlining life. Additionally, Errand Catchers frequently provide a flexible and customized approach to cater to the specific needs of their clients, establishing themselves as an invaluable resource for those seeking convenience and time optimization amid their hectic schedules.</p>
                 <a href="sign-in" id="getStartedLink" className="btn">Get Started</a>
                 <div><a href="map">View here</a></div>
                 
                </div>
            </div>


            <section className="Services" id="Services">
                <h1><span>S</span>ervices</h1>
                <div className="box-container">
                    <div className="box">
                        <img src="/images/img1.png" alt="" />
                        <div className="content">
                            <p>Title</p>
                            <h3>
                                {' '}
                                <i className="fas fa-map-marker-alt"></i> Mandaue City{' '}
                            </h3>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="price">
                                {' '}
                                ₱80.00 <span>₱120.00</span>{' '}
                            </div>
                            <a href="#" className="btn">
                                Book now
                            </a>
                        </div>
                    </div>
                    
                    <div className="box">
                        <img src="/images/img2.png" alt="" />
                        <div className="content">
                            <p>Title</p>
                            <h3>
                                {' '}
                                <i className="fas fa-map-marker-alt"></i> Lapu-Lapu City{' '}
                            </h3>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="price">
                                {' '}
                                ₱200.00 <span>₱250.00</span>{' '}
                            </div>
                            <a href="#" className="btn">
                                Book now
                            </a>
                        </div>
                    </div>
                
                    <div className="box">
                        <img src="/images/img3.png" alt="" />
                        <div className="content">
                            <p>Title</p>
                            <h3>
                                {' '}
                                <i className="fas fa-map-marker-alt"></i> Cebu City{' '}
                            </h3>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="price">
                                {' '}
                                ₱450.00 <span>₱500.00</span>{' '}
                            </div>
                            <a href="#" className="btn">
                                Book now
                            </a>
                        </div>
                    </div>

                </div>

                   <div className="box-container">
                    <div className="box">
                        <img src="/images/img6.png" alt="" />
                        <div className="content">
                            <p>Title</p>
                            <h3>
                                {' '}
                                <i className="fas fa-map-marker-alt"></i> Toledo City{' '}
                            </h3>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="price">
                                {' '}
                                ₱100.00 <span>₱150.00</span>{' '}
                            </div>
                            <a href="#" className="btn">
                                Book now
                            </a>
                        </div>
                    </div>
              
                    <div className="box">
                        <img src="/images/img4.png" alt="" />
                        <div className="content">
                            <p>Title</p>
                            <h3>
                                {' '}
                                <i className="fas fa-map-marker-alt"></i> Carcar City{' '}
                            </h3>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="price">
                                {' '}
                                ₱300.00 <span>₱350.00</span>{' '}
                            </div>
                            <a href="#" className="btn">
                                Book now
                            </a>
                        </div>
                    </div>
                    
                    <div className="box">
                        <img src="/images/img5.png" alt="" />
                        <div className="content">
                            <p>Title</p>
                            <h3>
                                {' '}
                                <i className="fas fa-map-marker-alt"></i> Danao City{' '}
                            </h3>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="price">
                                {' '}
                                ₱130.00 <span>₱180.00</span>{' '}
                            </div>
                            <a href="#" className="btn">
                                Book now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="People" id="People">
                <h1><span>P</span>eople</h1>
                <div className="box-container">
                <div className="box">
                        <img src="/images/employer.png" alt="" />   
                    <div className="content">
                            <h3>Employer</h3>
                    </div>
                </div>
                    
                    <div className="box">
                        <img src="/images/employee.png" alt="" />   
                        <div className="content">
                            <h3>Catcher</h3>
                    </div>
                </div>
                    
                    </div>
            </section>
        
            <Footer />
        </>
    );
};

export default Landing;