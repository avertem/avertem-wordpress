import React from 'react';

export const ContractErrorsDefaults = {
  contract_errors: []
}

export const ContractErrorsContext = React.createContext({
  contract_errors: ContractErrorsDefaults.contract_errors
  });