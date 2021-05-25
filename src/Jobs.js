import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from './apiHelper';
import SearchForm from './SearchForm';
import { UserContext } from './UserContext';
import Job from './Job';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const user = useContext(UserContext);

  const [prevApps, setPrevApps] = useState();

  useEffect(() => {
    getJobs();
    previousApplications();
  }, [user]);

  function previousApplications() {
    if (user.user) {
      setPrevApps((prevApps) => user.user[2].applications);
    }
  }

  async function getJobs(title) {
    const retrieved = await JoblyApi.getJobs(title);
    setJobs(retrieved);
  }

  async function apply(e) {
    const jobId = e.target.id;
    const username = user.user[2].username;
    const saveApplication = await user.apply(username, jobId);
  }

  const jobsToRender = jobs.map((j) =>
    prevApps.includes(j.id) ? (
      <Job key={j.id} id={j.id} job={j} applied={true} apply={apply} />
    ) : (
      <Job key={j.id} id={j.id} job={j} applied={false} apply={apply} />
    )
  );

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
