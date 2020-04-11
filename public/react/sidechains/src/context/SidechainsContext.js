import React from 'react';

export const SidechainsDefaults = {
  sidechains: []
}

export const SidechainsContext = React.createContext({
  sidechains: SidechainsDefaults.sidechains
  });