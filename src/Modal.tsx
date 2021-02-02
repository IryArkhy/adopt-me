import React, { useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal: FunctionComponent = ({ children }) => {
  //Before
  // const elRef = useRef(null);

  // if (!elRef.current) {
  //   elRef.current = document.createElement("div");
  // }

  // After
  const elRef = useRef(document.createElement("div"));

  useEffect(() => {
    if (!modalRoot) return;
    const { current } = elRef;

    modalRoot.appendChild(current);
    return () => {
      modalRoot.removeChild(current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
