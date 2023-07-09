import React, { useState } from 'react';
import './FDAdmit.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FDAdmitForm() {
    const [formData, setFormData] = useState({
        PatientID: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        // toast.success('Admitted Successfully!',
        //     { position: toast.POSITION.BOTTOM_CENTER })

        event.preventDefault();
        console.log(formData)
        axios.post('http://127.0.0.1:8000/api/admitPatient', formData)
            .then((response) => {
                setFormData({
                    PatientID: '',
                });
                console.log(response)
                toast.success('Admitted Successfully!',
                    { position: toast.POSITION.BOTTOM_CENTER })
                console.log("Admitted successfully!");                // setTimeout(() => window.location.reload(), 3000); // Refresh page after 3 seconds
            })
            .catch((error) => {
                toast.error(error.response.data.message,
                    { position: toast.POSITION.BOTTOM_CENTER });
            });
    };

    return (
        <div className="containerAdmit">
            <header>Admit Patient</header>

            <form action="#">
                <div className="form first">
                    <div className="details personal">
                        <span className="title">Patient Information</span>

                        <div className="fields">
                            {/* <div className="input-field">
                                <label>Full Name</label>
                                <input type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div> */}

                            {/* <div className="input-field">
                                <label>Date of Birth</label>
                                <input type="date" placeholder="Enter birth date" required />
                            </div> */}

                            <div className="input-field">
                                <label>Patient ID</label>
                                <input type="text" placeholder="Enter ID" name="PatientID" value={formData.PatientID} onChange={handleInputChange} required />
                            </div>
                            {/* <div className="input-field">
                                <label>Email</label>
                                <input type="text" placeholder="Enter your email" required />
                            </div> */}

                            {/* <div className="input-field">
                                <label>Mobile Number</label>
                                <input type="number" placeholder="Enter mobile number" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
                            </div> */}

                            {/* <div className="input-field">
                                <label>Gender</label>
                                <select required>
                                    <option disabled selected>Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>
                            </div> */}

                            <div className="input-field">
                                <label>Admitted By</label>
                                <input type="text" placeholder="Enter your name" required />
                            </div>
                        </div>
                    </div>

                    <div className="details IDBtn">
                        {/* <span className="title">Identity Details</span>

                        <div className="fields">
                            <div className="input-field">
                                <label>ID Type</label>
                                <input type="text" placeholder="Enter ID type" required />
                            </div>

                            <div className="input-field">
                                <label>ID Number</label>
                                <input type="number" placeholder="Enter ID number" required />
                            </div>

                            <div className="input-field">
                                <label>Issued Authority</label>
                                <input type="text" placeholder="Enter issued authority" required />
                            </div>

                            <div className="input-field">
                                <label>Issued State</label>
                                <input type="text" placeholder="Enter issued state" required />
                            </div>

                            <div className="input-field">
                                <label>Issued Date</label>
                                <input type="date" placeholder="Enter your issued date" required />
                            </div>

                            <div className="input-field">
                                <label>Expiry Date</label>
                                <input type="date" placeholder="Enter expiry date" required />
                            </div>
                        </div> */}

                        <button className="nextBtn" onClick={handleSubmit}>
                            <span className="btnText">Submit</span>
                            <i className="uil uil-navigator"></i>
                        </button>
                    </div>
                </div>


            </form>
            <ToastContainer />
        </div>
    );
}

export default FDAdmitForm;
