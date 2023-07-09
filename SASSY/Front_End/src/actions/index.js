import * as api from "../api"
import { toast } from "react-toastify"
import { toastOptions } from "../constants"

const handleError = (err) => {
  const defaultError = "Something went wrong. Please try again later."

  if (err === null || err.response === undefined) {
    toast.error(defaultError, toastOptions)
    return
  }

  switch (err.response.status) {
    case 401, 405:
      toast.error(err.response.data.detail, toastOptions)
      break
    default:
      toast.error(defaultError, toastOptions)
  }
}

export const checkAuth = async () => {
  let response = null
  await api.isAuth()
    .then(res => {
      response = res.data.response.user_type
    })
    .catch(err => {
      return
    })

  return response
}

export const redirectUser = async (userType, navigate, setLoading) => {
  let response = await checkAuth()

  if (response === null) {
    if (userType === null) {
      setLoading && setLoading(false)
      return
    }

    navigate("/")
    return true
  }

  if (userType === response) {
    setLoading && setLoading(false)
    return
  }

  navigate(-1)
  return true
}

export const handleLogin = async (user) => {
  let response = null
  await api.logIn(user)
    .then(res => {
      toast.success("Login successful.", toastOptions)
      response = res
    })
    .catch(err => {
      handleError(err)
    })

  return response
}

export const handleLogout = async () => {
  let response = null
  await api.logOut()
    .then(res => {
      toast.success("Logout successful.", toastOptions)
      response = res
    })
    .catch(err => {
      handleError(err)
    })

  return response
}

export const handleListUsers = async (usertype, setUsers, setLoading) => {
  setLoading(true)

  await api.listUsers({ user_type: usertype })
    .then(res => {
      setUsers(res.data.List)
      setLoading(false)
    })
    .catch(err => {
      handleError(err)
    })
}

export const handleCreateUser = async (userData, initialData, resetData) => {
  await api.createUser(userData)
    .then(res => {
      toast.success("User created successfully.", toastOptions)
      resetData(initialData)
    })
    .catch(err => {
      handleError(err)
    })
}

export const handleDeleteUser = async (id, type) => {
  let status = null
  await api.deleteUser({ EmployeeId_id: id, user_type: type })
    .then(res => {
      status = true
      toast.success("User deleted successfully.", toastOptions)
    })
    .catch(err => {
      handleError(err)
    })

  return status
}

export const handleListAppointments = async (setPatients, setLoading) => {
  setLoading(true)

  await api.listAppointments()
    .then(res => {
      setPatients(res.data.List)
      console.log(res.data.List)
      setLoading(false)
    })
    .catch(err => {
      handleError(err)
    })
}

// export const handleDeleteAppointment = async (username) => {
//   await api.deleteAppointment({ req_user_name: username })
//     .then(res => {
//       toast.success("Appointment deleted successfully.", toastOptions)
//     })
//     .catch(err => {
//       handleError(err)
//     })
// }

export const handleListPatients = async (setPatients, setLoading) => {
  setLoading(true)

  await api.listPatients()
    .then(res => {
      setPatients(res.data.List)
      setLoading(false)
    })
    .catch(err => {
      handleError(err)
    })
}

export const handleShowPatient = async (id, setPatient, setLoading) => {
  setLoading(true)

  await api.showPatient({ id: id })
    .then(res => {
      console.log(res.data)
      setPatient(res.data)
      setLoading(false)
    })
    .catch(err => {
      handleError(err)
    })
}