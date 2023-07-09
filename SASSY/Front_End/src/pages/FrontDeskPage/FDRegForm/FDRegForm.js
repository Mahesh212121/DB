import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FDRegForm.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FDRegForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        DOB: '',
        Email: '',
        Phone: '',
        Gender: '',
        Address: '',
        AadharID: '',
    });
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/isAuth')
            .then(response => {
                console.log("hello coming")

            })
            .catch(error => {
                console.log("hello coming 2")
                console.log(error);
                navigate('/')

            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        console.log(formData)
        console.log("Hello i am here\n")
        axios.post('http://127.0.0.1:8000/api/registerPatient', formData)
            .then((response) => {
                setFormData({
                    Name: '',
                    DOB: '',
                    Email: '',
                    Phone: '',
                    Gender: '',
                    Address: '',
                    AadharID: '',
                });
                console.log(response.status)
                toast.success('Admitted Successfully!',
                    { position: toast.POSITION.BOTTOM_CENTER })
                console.log("Admitted successfully!");                // setTimeout(() => window.location.reload(), 3000); // Refresh page after 3 seconds
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.message,
                    { position: toast.POSITION.BOTTOM_CENTER });
            });
    };

    return (
        <div className="containerReg">
            <header>Registration</header>

            <form action="#">
                <div className="form first">
                    <div className="details personal">
                        <span className="title">Personal Details</span>

                        <div className="fields">
                            <div className="input-field">
                                <label>Full Name</label>
                                <input type="text" placeholder="Enter your name" name="Name" value={formData.Name} onChange={handleInputChange} required />
                            </div>

                            <div className="input-field">
                                <label>Date of Birth</label>
                                <input type="date" placeholder="Enter birth date" name="DOB" value={formData.DOB} onChange={handleInputChange} required />
                            </div>

                            <div className="input-field">
                                <label>Email</label>
                                <input type="text" placeholder="Enter your email" name="Email" value={formData.Email} onChange={handleInputChange} required />
                            </div>

                            <div className="input-field">
                                <label>Mobile Number</label>
                                <input type="number" placeholder="Enter mobile number" name="Phone" value={formData.Phone} onChange={handleInputChange} required />
                            </div>

                            <div className="input-field">
                                <label>Gender</label>
                                <select name="Gender" value={formData.Gender} onChange={handleInputChange} required>
                                    <option selected>Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>
                            </div>

                            <div className="input-field">
                                <label>Address</label>
                                <input type="text" placeholder="Enter your Address" name="Address" value={formData.Address} onChange={handleInputChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="details ID">
                        <span className="title">Identity Details</span>

                        <div className="fields">
                            <div className="input-field">
                                <label>ID Type</label>
                                <input type="text" placeholder="Enter ID type" required />
                            </div>

                            <div className="input-field">
                                <label>ID Number</label>
                                <input type="number" placeholder="Enter ID number" name="AadharID" value={formData.AadharID} onChange={handleInputChange} required />
                            </div>

                            <div className="input-field">
                                <label>Issued Authority</label>
                                <input type="text" placeholder="Enter issued authority" required />
                            </div>


                        </div>

                        <button className="nextBtn" onClick={handleSubmit}>
                            <span className="btnText">Submit</span>
                        </button>
                    </div>
                </div>


            </form>
            <ToastContainer />
        </div>
    );
}

export default FDRegForm;
