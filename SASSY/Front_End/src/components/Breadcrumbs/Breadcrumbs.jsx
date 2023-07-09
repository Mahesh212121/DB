import React from "react"
import { Link } from "react-router-dom"
import useBreadcrumbs from "use-react-router-breadcrumbs"
import "./Breadcrumbs.scss"

function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs()

  return (
    <>
      <nav className="breadcrumb-nav">
        <ul>
          {breadcrumbs.map(({ key, breadcrumb }, index) => (
            <li key={index}>
              <a href={key}>
                <h3>{breadcrumb}</h3>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <hr className="breadcrumb-line" />
      <div className="margin-divider-xxsm"></div>
    </>
  )
}

export default Breadcrumbs
