import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  // static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async post(endpoint, data = {}, method = 'post') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'post' ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** `Get all companies / get filtered companies 
   TODO: add minEmployees and maxEmployees to search params */
  static async getCompanies(name) {
    if (name) {
      let res = await this.request('companies', { name });
      return res.companies;
    } else {
      let res = await this.request('companies');
      return res.companies;
    }
  }

  /** `Get all jobs / get filtered jobs 
   TODO: add minSalary, hasEquity and title to search params */
  static async getJobs(title) {
    if (title) {
      let res = await this.request('jobs', { title });
      return res.jobs;
    } else {
      let res = await this.request('jobs');
      return res.jobs;
    }
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  //** Register user */
  static async register(userData) {
    let res = await this.post('auth/register', userData);
    JoblyApi.token = res.token;
    return res.token;
  }

  /** Login */
  static async login(userData){
    let res = await this.post('auth/token', userData);
    return res.token;
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
//   'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
//   'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default JoblyApi;
