import React from 'react';
const isLoggedIn = false;
const loginContext = React.createContext({isLoggedIn: false, token: '', id: 0});

export { loginContext };
