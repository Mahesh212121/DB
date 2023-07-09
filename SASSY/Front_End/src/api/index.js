import axios from "axios"

const api = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
})

export const listUsers = payload => api.post(`/list-users`, payload)
export const createUser = payload => api.post(`/create-user`, payload)
export const deleteUser = payload => api.post(`/delete-user`, payload)

export const listAppointments = () => api.get(`/list-appointments`)
// export const deleteAppointment = payload => api.delete(`/delete-appointment`, payload)

export const listPatients = () => api.get(`/list-patients`)
export const showPatient = payload => api.post(`/show-patient`, payload)

export const isAuth = () => api.get(`/isAuth`)
export const logIn = payload => api.post(`/login`, payload)
export const logOut = () => api.post(`/logout`)
