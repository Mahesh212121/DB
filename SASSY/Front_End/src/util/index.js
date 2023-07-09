export const userModalData = (user) => {
  return [
    {
      key: "Username",
      value: user.username
    },
    {
      key: "Name",
      value: user.Name
    },
    {
      key: "Date of Birth",
      value: user.DOB
    },
    {
      key: "Gender",
      value: genderMap(user.Gender)
    },
    {
      key: "Aadhar Number",
      value: user.AadharId
    },
    {
      key: "Email",
      value: user.email,
    },
    {
      key: "Phone Number",
      value: user.Phone
    },
    {
      key: "Address",
      value: user.Address
    }
  ]
}

export const patientModalData = (patient) => {
  return [
    {
      key: "Name",
      value: patient.Name
    },
    {
      key: "Date of Birth",
      value: patient.DOB
    },
    {
      key: "Gender",
      value: genderMap(patient.Gender),
    },
    {
      key: "Aadhar Number",
      value: patient.AadharId
    },
    {
      key: "Email",
      value: patient.Email,
    },
    {
      key: "Phone Number",
      value: patient.Phone
    },
    {
      key: "Address",
      value: patient.Address
    }
  ]
}

export const medicationModalData = (med) => {
  return [
    {
      key: "Appointment ID",
      value: med.AppointmentID
    },
    {
      key: "Doctor ID",
      value: med.Doctor_id
    },
    {
      key: "Code",
      value: med.Code
    },
    {
      key: "Issued on",
      value: med.Start.slice(0, 10)
    }
  ]
}

export const treatmentModalData = (treatment) => {
  return [
    {
      key: "Appointment ID",
      value: treatment.AppointmentID
    },
    {
      key: "Doctor ID",
      value: treatment.Doctor_id
    },
    {
      key: "Name",
      value: treatment.Name
    },
    {
      key: "Treated on",
      value: convertToDnT(treatment.Date)
    }
  ]
}

export const testModalData = (test) => {
  return [
    {
      key: "Appointment ID",
      value: test.AppointmentID
    },
    {
      key: "Doctor ID",
      value: test.Doctor_id
    },
    {
      key: "Code",
      value: test.Code
    },
    {
      key: "Report ID",
      value: test.ReportID
    },
    {
      key: "Test ID",
      value: test.Test_id
    },
    {
      key: "Name",
      value: test.Name
    },
    {
      key: "Tested on",
      value: test.Start.slice(0, 10)
    },
    {
      key: "Description",
      value: test.Description
    },
    {
      key: "Result",
      value: test.TestResult
    }
  ]
}

export const genderMap = (index) => {
  switch (index) {
    case 1:
      return "Male"
    case 2:
      return "Female"
    case 3:
      return "Other"
  }
}

export const convertToDnT = (date) => {
  return (date ? date.slice(0, 10) + " " + date.slice(11, 19) : "null")
}