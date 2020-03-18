import React from 'react';

export const AccountDefaults = {
    accountDetails: {
        account: "",
        debits: 0,
        credits: 0,
        total: 0,
        progress: 0}
}

export const AccountContext = React.createContext({
    accountDetails:AccountDefaults.accountDetails,
  });