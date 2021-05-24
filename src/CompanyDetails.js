import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { useParams } from 'react-router-dom';
import JoblyApi from './apiHelper';

// TODO: fix the twice-rendering situation, once is null, the second has data

const CompanyDetails = ({ getJobs }) => {
  const { handle } = useParams();

  const user = useContext(UserContext);

  const [userName, setUserName] = useState(null);

  const [jobs, setJobs] = useState([]);

  const [applications, setApplications] = useState([]);

  useEffect(async () => {
    const allJobs = await getJobs(handle);
    setJobs((jobs) => allJobs);
    fill();
  }, [user]);

  function fill() {
    if (user.user) {
      setApplications((applications) => user.user[2].applications);
      setUserName((userName) => user.user[2].username);
    } else {
      console.log('no');
    }
  }

  function handleApply(e) {
    const jobId = e.target.id;
    const username = user.user[2].username;
    console.log(username);
    user.apply(username, jobId);
  }

  // Check if jobs are coming and map over them to render cards

  return (
    <div>
      <h1>Jobs at {handle} </h1>
      {user.user
        ? jobs.map((j) => (
            <div>
              <div>
                <h2>{j.title}</h2>
                <h2>Salary: {j.salary}</h2>
                <h2>Equity: {j.equity}</h2>
                <button id={j.id} onClick={handleApply}>
                  Apply
                </button>
              </div>
            </div>
          ))
        : // <h1>No jobs at this company</h1>
          jobs.map((j) => (
            <div>
              <div>
                <h2>{j.title}</h2>
                <h2>Salary: {j.salary}</h2>
                <h2>Equity: {j.equity}</h2>
              </div>
            </div>
          ))}
    </div>
  );
};

export default CompanyDetails;
