import React, { useState } from "react"
import { Link } from "react-router-dom"
import { HiMenuAlt1, HiOutlineX } from "react-icons/hi"
import { routeChildren, images, usermap } from "../../constants"
import { Overlay } from "../../components"

import { motion, AnimatePresence } from "framer-motion"
import "./Navbar.scss"

const Navbar = ({ userType, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="app__navbar app__pad">
      <div className="app__navbar-container">
        <div className="app__navbar-logo">
          <img src={images.logo} alt="logo" />
          <h1>SASSY</h1>
        </div>
        {userType !== null && (
          <>
            <ul className="app__navbar-links">
              {routeChildren[userType]?.map((task, index) => (
                <li key={index}>
                  <Link to={`${usermap[userType]}/${task.path}`}>
                    {task.breadcrumb}
                  </Link>
                </li>
              ))}
            </ul>
            {routeChildren[userType]?.length > 0 && (
              <div className="app__navbar-menu">
                <HiMenuAlt1 onClick={() => setIsMenuOpen(true)} />
                <AnimatePresence>
                  {isMenuOpen && (
                    <>
                      <motion.div
                        animate={{ x: 0 }}
                        initial={{ x: "100%" }}
                        transition={{ duration: 0.2 }}
                        exit={{ x: "100%" }}
                        className="app__navbar-menu-container"
                      >
                        <HiOutlineX onClick={() => setIsMenuOpen(false)} />
                        <ul>
                          {routeChildren[userType]?.map((task, index) => (
                            <li
                              key={index}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Link to={`${usermap[userType]}/${task.path}`}>
                                {task.breadcrumb}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                      <Overlay handleClick={() => setIsMenuOpen(false)} />
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
      {userType !== null && (
        <button onClick={handleLogout} className="btn-secondary-sm logout-btn">
          Logout
        </button>
      )}
    </nav>
  )
}

export default Navbar
