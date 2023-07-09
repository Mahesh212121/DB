import React, { useState, useEffect } from "react"
import axios from "axios";
import "./TestReport.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Treatment = () => {
    const [testReports, setTestreports] = useState([
        { test_id: 1, Name: "Paracetamol" },
        { test_id: 2, Name: "Dolo-650" },

    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [filteredTestReports, setFilteredTestReports] = useState([])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        const filtered = testReports.filter((testreport) =>
            testreport.Name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredTestReports(filtered)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getTestreport')
            .then(response => {
                console.log(response.data.List);
                setTestreports(response.data.List);
                toast.success('Test List Updated Successfully!',
                    { position: toast.POSITION.BOTTOM_CENTER })
            })
            .catch(error => {
                console.log(error);
                toast.error('Could not refresh testreport list',
                    { position: toast.POSITION.BOTTOM_CENTER })
            });
    }, []);




    return (
        <div className="sectionMed s-wrapper">
            <div className="margin-divider-sm" />
            <h1 className="center-text doctor-subheading">Test</h1>
            <input
                type="text"
                placeholder="Search testReports"
                value={searchTerm}
                onChange={handleSearch}
                className="inputsearch"
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th> Test Name</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTerm === ""
                        ? testReports.map((testreport) => (
                            <tr key={testreport.test_id}>
                                <td>{testreport.test_id}</td>
                                <td>{testreport.Name}</td>
                            </tr>
                        ))
                        : filteredTestReports.map((testreport) => (
                            <tr key={testreport.test_id}>
                                <td>{testreport.test_id}</td>
                                <td>{testreport.Name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}

export default Treatment