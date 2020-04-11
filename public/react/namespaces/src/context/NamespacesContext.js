import React from 'react';

export const NamespacesDefaults = {
  namespaces: []
}

export const NamespacesContext = React.createContext({
  namespaces: NamespacesDefaults.namespaces
  });