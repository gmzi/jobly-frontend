import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { useParams } from 'react-router-dom';
import Job from './Job';
import JoblyApi from './apiHelper';

// TODO: fix the multi-rendering situation, and correct buttons update

const CompanyDetails = ({ getJobs }) => {
  const { handle } = useParams();

  const user = useContext(UserContext);

  const [userName, setUserName] = useState(null);

  const [jobs, setJobs] = useState([]);

  const [prevApps, setPrevApps] = useState();

  useEffect(() => {
    getJobs(handle);
    previousApplications();
  }, [user]);

  async function getJobs(handle) {
    const req = await JoblyApi.getCompany(handle);
    setJobs((jobs) => req.jobs);
  }

  function previousApplications() {
    if (user.user) {
      setPrevApps((prevApps) => user.user[2].applications);
    }
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
