// import React, { useState } from 'react';
// import Nav from './Nav';
// import Routes from './Routes';
// import UserContext from './UserContext';

// function UserProvider() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const local = window.localStorage.getItem('currUser');
//     setUser((user) => JSON.parse(local));
//   });

//   return (
//     <UserContext.Provider value={user}>
//       <Nav />
//       <Routes />
//     </UserContext.Provider>
//   );
// }
