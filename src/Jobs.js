import React, { useState, useEffect } from 'react';
import JoblyApi from './apiHelper';
import SearchForm from './SearchForm';
import Job from './Job'
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs(title) {
    const retrieved = await JoblyApi.getJobs(title);
    setJobs(retrieved);
  }

  const jobsToRender = jobs.map((j) => <Job key={j.id} job={j} />);

  return (
    <div>
      <SearchForm load={loadJobs} />
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
