import React from 'react';
import './Job.css';

const Job = ({ job }) => {
  return (
    <div className="Job">
      <h1>{job.title}</h1>
      <h2>{job.companyHandle}</h2>
      <h4>{job.salary}</h4>
      <h4>Equity: {job.equity}</h4>
    </div>
  );
};

export default Job
