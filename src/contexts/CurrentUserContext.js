import * as React from 'react';

const CurrentUserContext = React.createContext({
    currentUser: {},
    setCurrentUser: () => {}
});

export {CurrentUserContext};