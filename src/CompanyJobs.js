import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { useParams } from 'react-router-dom';
import Job from './Job';
import JoblyApi from './apiHelper';

const CompanyJobs = () => {
  const { handle } = useParams();

  const user = useContext(UserContext);

  const [jobs, setJobs] = useState([]);

  const [company, setCompany] = useState(null);

  useEffect(() => {
    getJobs(handle);
  }, [user]);

  async function getJobs(handle) {
    const req = await JoblyApi.getCompany(handle);
    setJobs((jobs) => req.jobs);
    setCompany({ name: req.name, description: req.description });
  }

  function handleApplication(e) {
    const jobId = e.target.id;
    const username = user.user[2].username;
    user.applyFront(jobId, username);
  }

  let jobsToRender = [];

  if (user.user) {
    jobsToRender = jobs.map((j) =>
      user.prevApps.includes(j.id) ? (
        // <div className="CompanyJobs-list">
        <Job
          key={j.id}
          id={j.id}
          job={j}
          applied={true}
          apply={handleApplication}
          hasBtn={true}
        />
      ) : (
        // </div>
        // <div className="CompanyJobs-list">
        <Job
          key={j.id}
          id={j.id}
          job={j}
          applied={false}
          apply={handleApplication}
          hasBtn={true}
        />
        // </div>
      )
    );
  } else {
    jobsToRender = jobs.map((j) => (
      // <div className="CompanyJobs-list">
      <Job
        key={j.id}
        id={j.id}
        job={j}
        applied={true}
        apply={handleApplication}
        hasBtn={false}
      />
      // </div>
    ));
  }

  return (
    <div className="CompanyJobs col-md-8 offset-md-2">
      {company ? (
        <>
          <h4>{company.name}</h4>
          <p>{company.description}</p>
        </>
      ) : (
        <p></p>
      )}
      {jobsToRender.length ? (
        jobsToRender.map((j) => j)
      ) : (
        <h1>No jobs at this company</h1>
      )}
    </div>
  );
};

export default CompanyJobs;
