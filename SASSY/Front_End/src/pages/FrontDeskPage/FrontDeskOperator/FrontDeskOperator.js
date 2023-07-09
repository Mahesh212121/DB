import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Switches, Redirect, useNavigate } from 'react-router-dom';
import "../SideBar/SideBar.css";
import Logo from "../../../assets/Favicon.png";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import './FrontDeskOperator.css'
import MainDash from '../MainDash/MainDash';
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt
} from "@iconscout/react-unicons";

function FrontDeskOperator() {
    const navigate = useNavigate()

    const [page, setPage] = useState("Register");
    const SidebarData = [
        {
            icon: UilClipboardAlt,
            heading: "Profile",
        },
        {
            icon: UilClipboardAlt,
            heading: "Register",
        },
        {
            icon: UilClipboardAlt,
            heading: "Admit",
        },
        {
            icon: UilEstate,
            heading: "Doctorslot",
        },
        {
            icon: UilClipboardAlt,
            heading: "Appointment",
        },
        {
            icon: UilClipboardAlt,
            heading: "Discharge",
        },



    ];
    const [selected, setSelected] = useState(1);

    const [expanded, setExpaned] = useState(true)

    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }


    const handleLogout = () => {

        axios.post('http://127.0.0.1:8000/api/logout')
            .then((response) => {
                console.log(response.status)
                toast.success('Logout Successful',
                    { position: toast.POSITION.BOTTOM_CENTER })
                console.log("Logout successful!");                // setTimeout(() => window.location.reload(), 3000); // Refresh page after 3 seconds
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data.detail,
                    { position: toast.POSITION.BOTTOM_CENTER });
            });

    }
    console.log(window.innerWidth)
    return (
        <div className="AppFd">
            <div className="AppGlassFd">
                <>
                    <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
                        <UilBars />
                    </div>
                    <motion.div className='sidebar'
                        variants={sidebarVariants}
                        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
                    >
                        {/* logo */}
                        <div className="logo">
                            <img src={Logo} alt="logo" />
                            <span>
                                Sou<span>v</span>ik
                            </span>
                        </div>

                        <div className="menu">
                            {SidebarData.map((item, index) => {
                                return (
                                    <div
                                        className={selected === index ? "menuItem active" : "menuItem"}
                                        key={index}
                                        onClick={() => {
                                            setSelected(index);
                                            setPage(item.heading);
                                            console.log(item.heading)

                                        }}
                                    >
                                        <item.icon />
                                        <span>{item.heading}</span>
                                    </div>

                                );
                            })}
                            {/* signoutIcon */}
                            <div className="menuItem" onClick={handleLogout} >
                                <UilSignOutAlt />
                                Logout
                            </div>
                        </div>
                    </motion.div>
                </>
                <MainDash page={page} />
            </div>
        </div>
    );
}

export default FrontDeskOperator;