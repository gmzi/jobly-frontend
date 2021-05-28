import React, { useState, useEffect } from 'react';
import JoblyApi from './apiHelper';
import Company from './Company';
import SearchForm from './SearchForm';
import './Companies.css';

const Companies = () => {
  const [comps, setComps] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, [setComps]);

  async function loadCompanies(name) {
    const companies = await JoblyApi.getCompanies(name);
    console.log('HI', companies);
    setComps(companies);
  }

  const compsToRender = comps.map((c) => (
    <Company key={c.handle} company={c} />
  ));

  return (
    <div className="Companies col-md-8 offset-md-2">
      <SearchForm load={loadCompanies} />
      <h1>Companies</h1>
      <div className="Companies-cardsContainer">
        {compsToRender.length ? (
          <div>{compsToRender.map((c) => c)}</div>
        ) : (
          <p>Nothing found</p>
        )}
      </div>
    </div>
  );
};

export default Companies;
