import React from "react"
import { Overlay } from "../../components"

import { AiOutlineCloseCircle } from "react-icons/ai"
import { motion } from "framer-motion"
import "./Modal.scss"

const Modal = ({ element, handleClick }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="modal-container"
      >
        <div className="modal-side" />
        <div className="modal">
          <div className="close-modal clickable" onClick={handleClick}>
            <AiOutlineCloseCircle size={30} />
          </div>
          {element}
        </div>
        <div className="modal-side" />
      </motion.div>
      <Overlay handleClick={handleClick} opacity={0.7} />
    </>
  )
}

export default Modal
