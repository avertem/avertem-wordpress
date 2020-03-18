import React from 'react';

export const TransactionDefaults = {
  transactions: []
}

export const TransactionContext = React.createContext({
  transactions: TransactionDefaults.transactions
  });