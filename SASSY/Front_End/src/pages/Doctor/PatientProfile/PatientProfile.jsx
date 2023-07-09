import React, { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Table, Modal, UserDetails } from "../../../components"
import { redirectUser, handleShowPatient } from "../../../actions"
import {
  convertToDnT,
  patientModalData,
  medicationModalData,
  testModalData,
  treatmentModalData,
} from "../../../util"

import { AnimatePresence } from "framer-motion"

const PatientProfile = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [patient, setPatient] = useState({})
  const [medicationROI, setMedicationROI] = useState(-1)
  const [testROI, setTestROI] = useState(-1)
  const [treatmentROI, setTreatmentROI] = useState(-1)

  useEffect(() => {
    console.log("Patient Profile")
    const handleQuery = async () => {
      const res = await redirectUser(3, navigate)
      if (res) return
      handleShowPatient(id, setPatient, setLoading)
    }

    handleQuery()
  }, [location])

  function medicationData(medication) {
    medication = Array.from(medication)

    return medication.map((med) => ({
      id: med.AppointmentID,
      doctor_id: med.Doctor_id,
      code: med.Code,
      name: med.Name,
      date: med.Start.slice(0, 10),
    }))
  }

  function testData(testResult) {
    testResult = Array.from(testResult)

    return testResult.map((test) => ({
      id: test.AppointmentID,
      doctor_id: test.Doctor_id,
      code: test.Code,
      name: test.Name,
      date: test.Start.slice(0, 10),
    }))
  }

  function treatmentData(treatment) {
    treatment = Array.from(treatment)

    return treatment.map((treat) => ({
      id: treat.AppointmentID,
      doctor_id: treat.Doctor_id,
      name: treat.Name,
      date: convertToDnT(treat.Date),
    }))
  }

  return (
    <>
      {!loading && (
        <>
          <div>
            <UserDetails
              name={patient.Profile[0].Name}
              userInfo={patientModalData(patient.Profile[0])}
            />

            <div className="margin-divider-sm" />

            <div>
              <Table
                title="Medication"
                headers={[
                  "Appointment ID",
                  "Doctor ID",
                  "Code",
                  "Name",
                  "Date issued",
                ]}
                data={medicationData(patient.Medication)}
                searchKey="name"
                getInfo={(med) => setMedicationROI(med)}
              />
              <AnimatePresence>
                {medicationROI !== -1 && (
                  <Modal
                    element={
                      <UserDetails
                        name={patient.Medication[medicationROI].Name}
                        userInfo={medicationModalData(
                          patient.Medication[medicationROI]
                        )}
                      />
                    }
                    handleClick={() => setMedicationROI(-1)}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="margin-divider-sm" />

            <div>
              <Table
                title="Tests"
                headers={[
                  "Appointment ID",
                  "Doctor ID",
                  "Code",
                  "Name",
                  "Tested on",
                ]}
                data={testData(patient.Test)}
                searchKey="name"
                getInfo={(test) => setTestROI(test)}
              />
              <AnimatePresence>
                {testROI !== -1 && (
                  <Modal
                    element={
                      <UserDetails
                        name={patient.Test[testROI].Name}
                        userInfo={testModalData(patient.Test[testROI])}
                      />
                    }
                    handleClick={() => setTestROI(-1)}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="margin-divider-sm" />

            <div>
              <Table
                title="Treatment"
                headers={["Appointment ID", "Doctor ID", "Name", "Treated on"]}
                data={treatmentData(patient.Treatment)}
                searchKey="name"
                getInfo={(treatment) => setTreatmentROI(treatment)}
              />
              <AnimatePresence>
                {treatmentROI !== -1 && (
                  <Modal
                    element={
                      <UserDetails
                        name={patient.Treatment[treatmentROI].Name}
                        userInfo={treatmentModalData(
                          patient.Treatment[treatmentROI]
                        )}
                      />
                    }
                    handleClick={() => setTreatmentROI(-1)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PatientProfile
