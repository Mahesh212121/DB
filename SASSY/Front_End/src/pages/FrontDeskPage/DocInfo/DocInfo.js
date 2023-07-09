import React, { useState, useEffect } from "react"
import "./DocInfo.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DocInfo = () => {
    const [doctors, setPatients] = useState([
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },

    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPatients, setFilteredPatients] = useState([])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        const filtered = doctors.filter((doctor) =>
            doctor.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredPatients(filtered)
    }

    const [formData, setFormData] = useState({
        date: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleGetDoctorSlot = () => {
        axios.post('http://127.0.0.1:8000/api/docslot', formData)
            .then((response) => {
                console.log(response.data.List);
                setPatients(response.data.List);
                toast.success('List updated',
                    { position: toast.POSITION.BOTTOM_CENTER })
                console.log("Discharged successfully!");                // setTimeout(() => window.location.reload(), 3000); // Refresh page after 3 seconds
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data.detail,
                    { position: toast.POSITION.BOTTOM_CENTER });
            });
    };


    return (
        <div className="sectionDis s-wrapper">
            <div className="margin-divider-sm" />
            <h1 className="center-text doctor-subheading">Doctors Slot availability</h1>
            <input
                type="date"
                name="date" value={formData.date} onChange={handleInputChange}
                className="inputsearch"
            />
            <button className="getButton" onClick={handleGetDoctorSlot}>GET</button>
            <input
                type="text"
                placeholder="Search doctors"
                value={searchTerm}
                onChange={handleSearch}
                className="inputsearch"
            />

            <table className="disTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>

                    </tr>
                </thead>
                <tbody>
                    {searchTerm === ""
                        ? doctors.map((doctor) => (
                            <tr key={doctor.name}>
                                <td>{doctor.id}</td>
                                <td>{doctor.name}</td>

                            </tr>
                        ))
                        : filteredPatients.map((doctor) => (
                            <tr key={doctor.name}>
                                <td>{doctor.id}</td>
                                <td>{doctor.name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <ToastContainer />
        </div>
    )
}

export default DocInfo