import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, onClose }) {
  // Reference to the modal container element
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  // Ensure there's a modal root in the DOM
  const modalRoot = document.getElementById('modal-root') || createModalRoot();

  function createModalRoot() {
    const root = document.createElement('div');
    root.setAttribute('id', 'modal-root');
    document.body.appendChild(root);
    return root;
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      modalRoot.removeChild(elRef.current);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [modalRoot]);

  return ReactDOM.createPortal(
    <div className="custom-modal" onClick={onClose}>
      <div
        className="custom-modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Button */}
        <button className="modal-close-button" onClick={onClose} aria-label="Close Modal">
          &times;
        </button>
        {children}
      </div>
    </div>,
    elRef.current
  );
}

export default Modal;