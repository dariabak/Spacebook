import React from 'react';

const HomeContext = React.createContext({
    listOfPosts: [],
  
    addedNewPost: () => {}
  });

  export { HomeContext };