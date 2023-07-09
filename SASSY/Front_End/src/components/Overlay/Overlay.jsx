import React from "react"

import { motion } from "framer-motion"
import "./Overlay.scss"

const Overlay = ({ handleClick, opacity }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={opacity ? { opacity: opacity } : { opacity: 0.5 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-overlay"
      onClick={handleClick}
    />
  )
}

export default Overlay
