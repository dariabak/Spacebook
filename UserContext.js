import React from 'react';

const UserContext = React.createContext({
    user_data: {},
    setUserData: () => {}
  });

  export {UserContext};