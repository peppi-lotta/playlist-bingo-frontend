import React from 'react';

function LogoComponent({ largeSize }) {
  return (
    <div className="logo">
      {largeSize ? (
        <img
          src="../logo.svg"
          alt="Large Logo"
          style={{ width: '200px', height: '200px' }}
        />
      ) : (
        <img
          src="../logo.svg"
          alt="Small Logo"
          style={{ width: '100px', height: '100px' }}
        />
      )}
    </div>
  );
}

export default LogoComponent;
