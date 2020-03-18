import React from 'react';

export const ExplorerDefaults = {
  blocks: []
}

export const ExplorerContext = React.createContext({
  blocks: ExplorerDefaults.blocks
  });