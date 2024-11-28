import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function SpinnerOverlay() {
  // Create a div that will serve as the spinner root
  const spinnerRoot = document.getElementById('spinner-root') || createSpinnerRoot();

  function createSpinnerRoot() {
    const root = document.createElement('div');
    root.setAttribute('id', 'spinner-root');
    document.body.appendChild(root);
    return root;
  }

  // Create a container for the spinner
  const el = document.createElement('div');

  useEffect(() => {
    spinnerRoot.appendChild(el);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling if needed

    return () => {
      spinnerRoot.removeChild(el);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [el, spinnerRoot]);

  return ReactDOM.createPortal(
    <div className="spinner-overlay">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>,
    el
  );
}

export default SpinnerOverlay;
