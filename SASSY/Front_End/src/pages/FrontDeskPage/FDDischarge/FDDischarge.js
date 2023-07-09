import React, { useState, useEffect } from "react"
import "./FDDischarge.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FDDischarge = () => {
    const [patients, setPatients] = useState([
        { id: "1", name: "John Doe", stayID: 35, gender: 1 },
        { id: "2", name: "Jane Smith", stayID: 42, gender: 1 },

    ])
    const updateList = () => {
        axios.get('http://127.0.0.1:8000/api/patientstay')
            .then(response => {
                console.log(response.data.List);
                setPatients(response.data.List);
                toast.success('Patient List Updated Successfully!',
                    { position: toast.POSITION.BOTTOM_CENTER })
            })
            .catch(error => {
                console.log(error);
                toast.error('Could not refresh patient list',
                    { position: toast.POSITION.BOTTOM_CENTER })
            });
    }
    useEffect(() => {
        updateList();
    }, []);

    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPatients, setFilteredPatients] = useState([])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        const filtered = patients.filter((patient) =>
            patient.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredPatients(filtered)
    }
    // const [mess,setMess]=useState({stayid:0});
    const handleDischarge = (stayId) => {
        const dischargedPatient = patients.filter(obj => {
            return obj.stayID === stayId;
        }).Name;
        console.log(stayId + "is the stay id to discharge");
        const mess = { stayid: stayId.toString() };
        console.log(mess);
        axios.post('http://127.0.0.1:8000/api/dischargePatient', mess)
            .then((response) => {
                updateList();
                console.log(response.status)
                toast.success(dischargedPatient + ' discharged Successfully!',
                    { position: toast.POSITION.BOTTOM_CENTER })
                console.log("Discharged successfully!");                // setTimeout(() => window.location.reload(), 3000); // Refresh page after 3 seconds
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data.detail,
                    { position: toast.POSITION.BOTTOM_CENTER });
            });

    }


    return (
        <div className="sectionDis s-wrapper">
            <div className="margin-divider-sm" />
            <h1 className="center-text doctor-subheading">Discharge Patients</h1>
            <input
                type="text"
                placeholder="Search patients"
                value={searchTerm}
                onChange={handleSearch}
                className="inputsearch"
            />
            <table className="disTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Stay ID</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTerm === ""
                        ? patients.map((patient) => (
                            <tr key={patient.stayID}>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.stayID}</td>
                                <td>{patient.gender}</td>
                                <td> <button className="DischargeButton" onClick={() => {
                                    handleDischarge(patient.stayID);
                                }}>Discharge</button></td>
                            </tr>
                        ))
                        : filteredPatients.map((patient) => (
                            <tr key={patient.stayID}>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.stayID}</td>
                                <td>{patient.gender}</td>
                                <td> <button className="DischargeButton" onClick={() => handleDischarge(patient.stayID)}>Discharge</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}

export default FDDischarge