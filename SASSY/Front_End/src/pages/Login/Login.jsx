import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { redirectUser } from "../../actions"
import { AuthFields } from "../../components"
import "../../App.scss"
import "./Login.scss"

const LoginForm = ({ handleLogin }) => {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Login")
    redirectUser(null, navigate, setLoading)
  }, [location])

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    user_type: "",
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(userDetails)
  }

  return (
    <>
      {!loading && (
        <div className="form-container login-form-container">
          <form onSubmit={handleSubmit}>
            <h1>Log in to continue</h1>
            <div className="form-container-div-sm">
              <AuthFields user={userDetails} setUser={setUserDetails} />
            </div>
            <button type="submit" className="btn-primary-sm submit-btn">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default LoginForm
