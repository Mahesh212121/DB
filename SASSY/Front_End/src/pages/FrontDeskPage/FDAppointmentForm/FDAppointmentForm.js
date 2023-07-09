import React, { useState } from 'react';
import './FDAppointmentForm.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FDAppointmentForm() {
    const [formData, setFormData] = useState({
        PatientID: '',
        DoctorID: '',
        DateOfAppointment: '2023-03-17 00:00:00',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        console.log(event)
        event.preventDefault();
        const dateStr = formData.DateOfAppointment; // assuming formData.date is the date string
        const isoDate = new Date(dateStr).toISOString().slice(0, 19).replace('T', ' ');
        console.log(isoDate);
        setFormData({ ...formData, DateOfAppointment: isoDate })
        console.log(formData)
        axios.post('http://127.0.0.1:8000/api/appointmentPatient', formData)
            .then((response) => {
                setFormData({
                    PatientID: '',
                    DoctorID: '',
                    DateOfAppointment: '',
                });
                console.log(response)
                toast.success('Appointed Successfully!',
                    { position: toast.POSITION.BOTTOM_CENTER })
                console.log("Admitted successfully!");                // setTimeout(() => window.location.reload(), 3000); // Refresh page after 3 seconds
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.detail,
                    { position: toast.POSITION.BOTTOM_CENTER });
            });
    };

    return (
        <div className="containerApp">
            <header>Appointment</header>

            <form onSubmit={handleSubmit} className='appform' action="#">
                <div className="form first">
                    <div className="details personal">
                        <span className="title">Appointment Details</span>

                        <div className="fields">
                            <div className="input-field">
                                <label>Patient ID</label>
                                <input type="text" placeholder="Enter Patient ID" name="PatientID" value={formData.PatientID} onChange={handleInputChange} required />
                            </div>

                            <div className="input-field">
                                <label>Date of Appointment</label>
                                <input type="date" placeholder="Enter Appointment date" name="DateOfAppointment" value={formData.DateOfAppointment} onChange={handleInputChange} required />
                            </div>

                            <div className="input-field">
                                <label>Doctor ID</label>
                                <input type="text" placeholder="Enter Doctor ID" name="DoctorID" value={formData.DoctorID} onChange={handleInputChange} required />
                            </div>


                        </div>
                    </div>

                    <div className="details ID">
                        <button className="nextBtn">
                            <span className="btnText" onClick={handleSubmit}>Submit</span>
                        </button>
                    </div>
                </div>


            </form>
            <ToastContainer />
        </div>
    );
}

export default FDAppointmentForm;