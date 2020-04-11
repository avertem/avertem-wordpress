import React from 'react';

export const ContractsDefaults = {
  contracts: []
}

export const ContractsContext = React.createContext({
  contracts: ContractsDefaults.contracts
  });