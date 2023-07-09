import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Table, Modal, UserDetails } from "../../../components"
import { handleListAppointments, redirectUser } from "../../../actions"
import { patientModalData, genderMap } from "../../../util"

import { AnimatePresence } from "framer-motion"

const Appointments = () => {
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [patientROI, setPatientROI] = useState(-1)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Appointments")
    const handleQuery = async () => {
      const res = await redirectUser(3, navigate)
      if (res) return
      handleListAppointments(setPatients, setLoading)
    }

    handleQuery()
  }, [location])

  function limitedData(users) {
    users = Array.from(users)

    return users.map((user) => ({
      name: user.Name,
      dob: user.DOB,
      gender: genderMap(user.Gender),
      email: user.Email,
    }))
  }

  return (
    <>
      {!loading && (
        <>
          <div>
            <Table
              title="Pending appointments"
              headers={["Name", "Date of Birth", "Gender", "Email ID"]}
              data={limitedData(patients)}
              searchKey="name"
              getInfo={(patient) => setPatientROI(patient)}
            />
          </div>
          <AnimatePresence>
            {patientROI !== -1 && (
              <Modal
                element={
                  <UserDetails
                    name={patients[patientROI].Name}
                    userInfo={patientModalData(patients[patientROI])}
                  />
                }
                handleClick={() => setPatientROI(-1)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  )
}

export default Appointments
