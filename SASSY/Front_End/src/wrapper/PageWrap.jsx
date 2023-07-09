import React from "react"
import { HelmetWrap } from "../wrapper"
import { Breadcrumbs } from "../components"

function page(element) {
  return (
    <>
      <div className="s-wrapper">
        <Breadcrumbs />
        {element}
      </div>
      <div className="margin-divider-xsm" />
    </>
  )
}

const PageWrap = ({ title, element }) => {
  return (
    <>
      <HelmetWrap title={title} element={page(element)} />
    </>
  )
}

export default PageWrap
