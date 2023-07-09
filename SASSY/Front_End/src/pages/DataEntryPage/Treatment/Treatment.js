import React, { useState, useEffect } from "react"
import axios from "axios";
import "./Treatment.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Treatment = () => {
    const [treatments, setTreatments] = useState([
        { treatment_id: 1, Name: "Paracetamol" },
        { treatment_id: 2, Name: "Dolo-650" },

    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [filteredTreatments, setFilteredTreatments] = useState([])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        const filtered = treatments.filter((treatment) =>
            treatment.Name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredTreatments(filtered)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getTreatment')
            .then(response => {
                console.log(response.data.List);
                setTreatments(response.data.List);
                toast.success('Treatment List Updated Successfully!',
                    { position: toast.POSITION.BOTTOM_CENTER })
            })
            .catch(error => {
                console.log(error);
                toast.error('Could not refresh treatment list',
                    { position: toast.POSITION.BOTTOM_CENTER })
            });
    }, []);




    return (
        <div className="sectionMed s-wrapper">
            <div className="margin-divider-sm" />
            <h1 className="center-text doctor-subheading">Treatments</h1>
            <input
                type="text"
                placeholder="Search treatments"
                value={searchTerm}
                onChange={handleSearch}
                className="inputsearch"
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th> Treatment Name</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTerm === ""
                        ? treatments.map((treatment) => (
                            <tr key={treatment.treatment_id}>
                                <td>{treatment.treatment_id}</td>
                                <td>{treatment.Name}</td>
                            </tr>
                        ))
                        : filteredTreatments.map((treatment) => (
                            <tr key={treatment.treatment_id}>
                                <td>{treatment.treatment_id}</td>
                                <td>{treatment.Name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}

export default Treatment