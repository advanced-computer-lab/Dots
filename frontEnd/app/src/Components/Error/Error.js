import React from 'react';

const Error = ({ message, showError }) => {
    if( showError === '1' )
 { return (
    <p> {message} </p>
  );
 }
 else{
     return null;
 }
}

export default Error;