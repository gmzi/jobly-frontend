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
    <div className="Companies col-md-8 offset-md-2">
        <SearchForm load={loadCompanies} />
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
