import React from 'react';
import './Job.css';

const Job = ({ id, job, applied, apply, hasBtn }) => {
  function handleApply(e) {
    apply(e);
    e.target.disabled = true;
  }

  return (
    <div className="Job card">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p></p>
        <div>
          <small>Company: {job.companyHandle}</small>
        </div>
        <div>
          <small>Salary: {job.salary}</small>
        </div>
        <div>
          <small>Equity: {job.equity}</small>
        </div>
      </div>
      {hasBtn ? (
        <div>
          <button
            className="btn btn-danger text-uppercase"
            id={id}
            onClick={handleApply}
            disabled={applied}
          >
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
