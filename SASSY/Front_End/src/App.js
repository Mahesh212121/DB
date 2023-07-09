import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Navbar } from "./components"
import { toastOptions, usermap } from "./constants"
import { checkAuth, handleLogin, handleLogout } from "./actions"
import Router from "./routes"

import { ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./styles/Toast.scss"

const App = () => {
  const [userType, setUserType] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    isauth()
  }, [location])

  const isauth = async () => {
    const response = await checkAuth()
    setUserType(response)
  }

  const login = async (user) => {
    const response = await handleLogin(user)
    if (!response) return

    setUserType(user.user_type)
    navigate(`/${usermap[user.user_type]}`)
  }

  const logout = async () => {
    const response = await handleLogout()
    if (!response) return

    setUserType(null)
    navigate("/")
  }

  return (
    <>
      <Navbar
        userType={userType}
        handleLogout={logout}
      />

      <div className="app">
        <Router handleLogin={login} />
      </div>

      <ToastContainer
        position={toastOptions.position}
        autoClose={toastOptions.autoClose}
        hideProgressBar={toastOptions.hideProgressBar}
        closeOnClick={toastOptions.closeOnClick}
        pauseOnHover={toastOptions.pauseOnHover}
        theme={toastOptions.theme}
        transition={Zoom}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
      />
    </>
  )
}

export default App