import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';

import './Job.css';

const Job = ({ job }) => {

  return (
    <div className="Job">
      <div>
        <h1>{job.title}</h1>
        <h2>{job.companyHandle}</h2>
        <h4>{job.salary}</h4>
        <h4>Equity: {job.equity}</h4>
      </div>
      <div>
        <button>Apply</button>
      </div>
    </div>
  );
};

export default Job;
