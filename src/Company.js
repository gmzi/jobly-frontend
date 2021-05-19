import React from 'react';

const Company = ({ company }) => {
  const link = `/companies/${company.handle}`;
  return (
    <div className="Company">
      <a href={link}>
        <div>
          <img src={company.logoUrl} alt="" />
        </div>
        <h2>{company.name}</h2>
        <p>{company.description}</p>
      </a>
    </div>
  );
};

export default Company;
