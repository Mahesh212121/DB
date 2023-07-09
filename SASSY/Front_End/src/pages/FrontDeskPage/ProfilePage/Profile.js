import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProfileCard = () => {
    const [profileinfo, setProfileinfo] = useState({
        EmployeeId_id: '',
        Name: '',
        Address: '',
        Phone: '',
        Email: '',
        AadharId: '',
        Gender: '',
        DOB: '',

    })
    const genderMap = {
        '1': 'Male',
        '2': 'Female',
        '3': 'Other'
    }
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getProfile')
            .then(response => {
                console.log(response.data[0]);
                setProfileinfo(response.data[0]);

            })
            .catch(error => {
                console.log(error);
                toast.error('Could not refresh Profile page',
                    { position: toast.POSITION.BOTTOM_CENTER })
            });
    }, []);
    return (
        <div className="containerPro">
            <div className="col-lg-6">
                <h1 className="dark-color">{profileinfo.Name}</h1>
                <h3 className="theme-color lead">Front Desk Operator</h3>
            </div>
            <div className="about-text go-to">
                {/* <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p> */}
                <div className="row about-list">
                    <div className="col-md-6">
                        <div className="media">
                            <label>Date of Birth</label>
                            <p>{profileinfo.DOB}</p>
                        </div>

                        <div className="media">
                            <label>Address</label>
                            <p>{profileinfo.Address}</p>
                        </div>
                        <div className="media">
                            <label>Employee Id</label>
                            <p>{profileinfo.EmployeeId_id}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="media">
                            <label>E-mail</label>
                            <p>{profileinfo.Email}</p>
                        </div>
                        <div className="media">
                            <label>Phone</label>
                            <p>{profileinfo.Phone}</p>
                        </div>
                        <div className="media">
                            <label>Gender</label>
                            <p>{genderMap[profileinfo.Gender]}</p>
                        </div>
                        <div className="media">
                            <label>AadharID</label>
                            <p>{profileinfo.AadharId}</p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProfileCard;
