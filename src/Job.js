import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';

import './Job.css';

const Job = ({ id, job, applied, apply, hasBtn }) => {
  function handleApply(e) {
    apply(e);
    e.target.disabled = true;
  }

  return (
    <div className="Job">
      <div>
        <h1>{job.title}</h1>
        <h2>{job.companyHandle}</h2>
        <h4>Salary: {job.salary}</h4>
        <h4>Equity: {job.equity}</h4>
      </div>
      {hasBtn ? (
        <div>
          <button id={id} onClick={handleApply} disabled={applied}>
            {applied ? 'Applied' : 'Apply'}
          </button>
        </div>
      ) : (
        <a href="/login">login to apply</a>
        // TODO: useHistory to redirect user to the targeted job after login
      )}
    </div>
  );
};

export default Job;
