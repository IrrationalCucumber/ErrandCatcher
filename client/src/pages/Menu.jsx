import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import "./Menu.css";

const Menu = () => {

    return (
         <>
            <NavBar />

            <section className="Menu" id="Menu">
            <div className="box-container">
                    <div className="box">
                        <img src="/images/img6.png" alt="" />
                        <div className="content">
                            <p>Home Services</p>
                        </div>
                    </div>
                    <div className="box">
                        <img src="/images/img4.png" alt="" />
                        <div className="content">
                            <p>Transportation</p>
                        </div>
                    </div>
                    <div className="box">
                        <img src="/images/img5.png" alt="" />
                        <div className="content">
                            <p>Delivery</p>
                        </div>     
                    </div>  
            </div> 
               
    </section>

    <section className="Menu1" id="Menu1">
                <div className="box-container">
                    <div className="box">
                        <img src="/images/img1.png" alt="" />
                        <div className="content">
                            <p>Transportation</p>
                            <h3>
                                <i className="fas fa-map-marker-alt"></i> Cebu City{' '}
                            </h3>
                            </div>
                       </div>
                    <div className="box">
                        <img src="/images/img2.png" alt="" />
                        <div className="content">
                            <p>Delivery</p>
                            <h3>
                                <i className="fas fa-map-marker-alt"></i> Lapu-Lapu City{' '}
                            </h3>
                        </div>
                    </div>
                
                    <div className="box">
                        <img src="/images/img3.png" alt="" />
                        <div className="content">
                            <p>Home Service</p>
                            <h3>
                                <i className="fas fa-map-marker-alt"></i> Mandaue City{' '}
                            </h3>
                        </div>
                        
                    </div>
                    <div className="box">
                        <img src="/images/img1.png" alt="" />
                        <div className="content">
                            <p>Transportation</p>
                            <h3>
                                <i className="fas fa-map-marker-alt"></i>  Consolacion{' '}
                            </h3>
                        </div>
                        
                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
};
export default Menu;