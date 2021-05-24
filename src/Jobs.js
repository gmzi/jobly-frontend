import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from './apiHelper';
import SearchForm from './SearchForm';
import { UserContext } from './UserContext';
import Job from './Job';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [applied, setApplied] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    loadJobs();
    checkUser();
  }, []);

  function checkUser() {
    if (user) {
      console.log('si');
    } else {
      console.log('no');
    }
  }

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
