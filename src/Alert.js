import React from 'react';

function Alert({ type = 'danger', message }) {
  console.debug('Alert', 'type=', type, 'message=', message);

  return (
    <div className={`alert alert-${type} mt-4`} role="alert">
      {message.map((error) => (
        <p className="mb-0 small" key={error}>
          {error}
        </p>
      ))}
      {/* {message} */}
    </div>
  );
}

export default Alert;
