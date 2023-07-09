import React from "react"
import { Helmet } from "react-helmet-async"

const HelmetWrap = ({ title, element }) => {
  const appender = " | SASSY"
  return (
    <>
      <Helmet>
        <title>{title + appender}</title>
      </Helmet>
      <div className="section">{element}</div>
    </>
  )
}

export default HelmetWrap
