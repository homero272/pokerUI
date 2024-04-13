import React from 'react';

const GlobalStyle = () => {
  return (
    <style>
      {`
        @font-face {
          font-family: 'normal';
          src: url('/fonts/AvenirNextLTPro-Demi.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
            font-family: 'heavy';
            src: url('/fonts/AvenirNextLTPro-Heavy.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
  
      `}
    </style>
  );
};

export default GlobalStyle;
