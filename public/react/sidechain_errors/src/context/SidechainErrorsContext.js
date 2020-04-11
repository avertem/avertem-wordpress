import React from 'react';

export const SidechainErrorsDefaults = {
  sidechain_errors: []
}

export const SidechainErrorsContext = React.createContext({
  sidechain_errors: SidechainErrorsDefaults.sidechain_errors
  });