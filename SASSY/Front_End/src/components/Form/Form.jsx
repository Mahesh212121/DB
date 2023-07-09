import React, { useState } from "react"

function handleChange(event, user, setUser) {
  const { name, value } = event.target
  setUser({ ...user, [name]: value })
}

export const AuthFields = ({ user, setUser }) => {
  return (
    <>
      <input
        type="text"
        name="username"
        value={user.username}
        placeholder="Username"
        onChange={(event) => handleChange(event, user, setUser)}
        required
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Password"
        onChange={(event) => handleChange(event, user, setUser)}
        required
      />
      <select
        name="user_type"
        value={user.user_type}
        onChange={(event) => handleChange(event, user, setUser)}
        required
      >
        <option value="" disabled>
          Select user type
        </option>
        <option value={1}>Front desk operator</option>
        <option value={2}>Data entry operator</option>
        <option value={3}>Doctor</option>
        <option value={4}>Adminstrator</option>
      </select>
    </>
  )
}

export const PersonalFields = ({ user, setUser }) => {
  return (
    <>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Name"
        onChange={(event) => handleChange(event, user, setUser)}
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Email"
        onChange={(event) => handleChange(event, user, setUser)}
        required
      />
      <input
        type="tel"
        name="phone"
        value={user.phone}
        placeholder="Phone"
        onChange={(event) => handleChange(event, user, setUser)}
        pattern="[0-9]{10}"
        title="Phone number must be 10 digits long."
        required
      />
      <input
        type="text"
        name="aadhar_id"
        value={user.aadhar_id}
        placeholder="Aadhar ID"
        onChange={(event) => handleChange(event, user, setUser)}
        pattern="[0-9]{12}"
        title="Aadhar ID must be 12 digits long."
        required
      />
      <select
        name="gender"
        value={user.gender}
        onChange={(event) => handleChange(event, user, setUser)}
        required
      >
        <option value="">Select gender</option>
        <option value={1}>Male</option>
        <option value={2}>Female</option>
        <option value={3}>Other</option>
      </select>
      <input
        type="date"
        name="dob"
        value={user.dob}
        placeholder="Date of Birth"
        onChange={(event) => handleChange(event, user, setUser)}
        required
      />
      <input
        type="text"
        name="address"
        value={user.address}
        placeholder="Address"
        onChange={(event) => handleChange(event, user, setUser)}
        className="span-full"
        required
      />
    </>
  )
}
