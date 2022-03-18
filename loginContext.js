import React from 'react';
const isLoggedIn = false;
const LoginContext = React.createContext({isLoggedIn: false, token: '', id: 0});

export { LoginContext };
