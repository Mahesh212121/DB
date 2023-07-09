import React, { useState, useEffect } from "react"
import axios from "axios";
import "./Medicine.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Medicine = () => {
    const [medicines, setMedicines] = useState([
        { medicine_id: 1, Name: "Paracetamol" },
        { medicine_id: 2, Name: "Dolo-650" },

    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [filteredMedicines, setFilteredMedicines] = useState([])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        const filtered = medicines.filter((medicine) =>
            medicine.Name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredMedicines(filtered)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getMedicine')
            .then(response => {
                console.log(response.data.List);
                setMedicines(response.data.List);
                toast.success('Medicine List Updated Successfully!',
                    { position: toast.POSITION.BOTTOM_CENTER })
            })
            .catch(error => {
                console.log(error);
                toast.error('Could not refresh medicine list',
                    { position: toast.POSITION.BOTTOM_CENTER })
            });
    }, []);




    return (
        <div className="sectionMed s-wrapper">
            <div className="margin-divider-sm" />
            <h1 className="center-text doctor-subheading">Medicines</h1>
            <input
                type="text"
                placeholder="Search medicines"
                value={searchTerm}
                onChange={handleSearch}
                className="inputsearch"
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th> Medicine Name</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTerm === ""
                        ? medicines.map((medicine) => (
                            <tr key={medicine.medicine_id}>
                                <td>{medicine.medicine_id}</td>
                                <td>{medicine.Name}</td>
                            </tr>
                        ))
                        : filteredMedicines.map((medicine) => (
                            <tr key={medicine.medicine_id}>
                                <td>{medicine.medicine_id}</td>
                                <td>{medicine.Name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}

export default Medicine