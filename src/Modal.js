import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Problems with modals - they are not accesible and its hard to trap focus with them.
const Modal = ({ children }) => {
  // I need to refer to the same element throughout renders and destroy the markup after I done.
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    // clean up: componentWillUnmount()
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
