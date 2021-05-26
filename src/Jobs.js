import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from './apiHelper';
import SearchForm from './SearchForm';
import { UserContext } from './UserContext';
import Job from './Job';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    getJobs();
  }, [user]);

  async function getJobs(title) {
    const retrieved = await JoblyApi.getJobs(title);
    setJobs(retrieved);
  }

  function handleApplication(e) {
    const jobId = e.target.id;
    const username = user.user[2].username;
    user.applyFront(jobId, username);
    return;
  }

  let jobsToRender = [];

  if (user.user) {
    jobsToRender = jobs.map((j) =>
      user.prevApps.includes(j.id) ? (
        <Job
          key={j.id}
          id={j.id}
          job={j}
          applied={true}
          apply={handleApplication}
          hasBtn={true}
        />
      ) : (
        <Job
          key={j.id}
          id={j.id}
          job={j}
          applied={false}
          apply={handleApplication}
          hasBtn={true}
        />
      )
    );
  } else {
    jobsToRender = jobs.map((j) => (
      <Job
        key={j.id}
        id={j.id}
        job={j}
        applied={true}
        apply={handleApplication}
        hasBtn={false}
      />
    ));
  }

  return (
    <div>
      <SearchForm load={getJobs} />
      <h1>Jobs</h1>
      {jobsToRender.length ? (
        <div>{jobsToRender.map((j) => j)}</div>
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

export default Jobs;
