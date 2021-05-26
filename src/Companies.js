import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from './apiHelper';
import Company from './Company';
import SearchForm from './SearchForm';
import './Companies.css';
import { UserContext } from './UserContext';

const Companies = () => {
  const [comps, setComps] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    loadCompanies();
  }, [setComps]);

  async function loadCompanies(name) {
    const companies = await JoblyApi.getCompanies(name);
    setComps(companies);
  }

  const compsToRender = comps.map((c) => (
    <Company key={c.handle} company={c} />
  ));

  return (
    <div>
      <SearchForm load={loadCompanies} />
      <h1>Companies</h1>
      {compsToRender.length ? (
        <div>{compsToRender.map((c) => c)}</div>
      ) : (
        <p>Nothing found</p>
      )}
    </div>
  );
};

export default Companies;
