import * as React from 'react';

const isLoadingContext = React.createContext({
    isLoading: false,
    setLoading: () => {}
});

export {isLoadingContext};