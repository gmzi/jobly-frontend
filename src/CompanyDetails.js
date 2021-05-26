import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { useParams } from 'react-router-dom';
import Job from './Job';
import JoblyApi from './apiHelper';

// TODO: fix the multi-rendering situation, and correct buttons update

const CompanyDetails = () => {
  const { handle } = useParams();

  const user = useContext(UserContext);

  const [userName, setUserName] = useState(null);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs(handle);
  }, [user]);

  async function getJobs(handle) {
    const req = await JoblyApi.getCompany(handle);
    setJobs((jobs) => req.jobs);
  }

  // async function apply(e) {
  //   const jobId = e.target.id;
  //   const username = user.user[2].username;
  //   const saveApplication = await user.apply(username, jobId);
  // }

  function handleApplication(e) {
    const jobId = e.target.id;
    const username = user.user[2].username;
    user.applyFront(jobId, username);
  }

  const jobsToRender = jobs.map((j) =>
    user.prevApps.includes(j.id) ? (
      <Job
        key={j.id}
        id={j.id}
        job={j}
        applied={true}
        apply={handleApplication}
      />
    ) : (
      <Job
        key={j.id}
        id={j.id}
        job={j}
        applied={false}
        apply={handleApplication}
      />
    )
  );

  return (
    <div>
      <h1>Jobs at {handle} </h1>
      {user.user && jobsToRender.length ? (
        jobsToRender.map((j) => j)
      ) : (
        <h1>No jobs at this company</h1>
      )}
    </div>
  );
};

export default CompanyDetails;
