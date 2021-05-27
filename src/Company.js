import React from 'react';
import './Company.css';

const Company = ({ company }) => {
  const link = `/companies/${company.handle}`;
  let logo = company.logoUrl;
  if (!logo) {
    logo = '/logos/logo2.png';
  }
  return (
    <a className="Company card" href={link}>
      <div className="card-body">
        <h6 className="card-title">
          {company.name}
          <img className="float-right" src={logo} alt={company.name} />
        </h6>
        <p>
          <small>{company.description}</small>
        </p>
      </div>
    </a>
  );
};

export default Company;
