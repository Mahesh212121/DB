import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthFields, PersonalFields } from "../../../components"
import { handleCreateUser, checkAuth, redirectUser } from "../../../actions"
import "./CreateUser.scss"

const CreateUser = () => {
  const initialUserDetails = {
    username: "",
    password: "",
    user_type: "",
    name: "",
    email: "",
    phone: "",
    aadhar_id: "",
    gender: "",
    dob: "",
    address: "",
  }
  const [userDetails, setUserDetails] = useState(initialUserDetails)
  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Create User")
    redirectUser(4, navigate, setLoading)
  }, [location])

  function handleSubmit(event) {
    event.preventDefault()

    handleCreateUser(
      {
        ...userDetails,
        dob: new Date(userDetails.dob.valueOf())
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      },
      initialUserDetails,
      setUserDetails
    )
  }

  return (
    <>
      {!loading && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Create user</h1>
            <div className="form-container-div">
              <AuthFields user={userDetails} setUser={setUserDetails} />
            </div>
            <hr className="span-full fields-separator" />
            <div className="form-container-div">
              <PersonalFields user={userDetails} setUser={setUserDetails} />
            </div>
            <button type="submit" className="btn-primary-sm submit-btn">
              Add user
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default CreateUser
