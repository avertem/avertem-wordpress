import React from 'react';

export const NamespaceErrorsDefaults = {
  namespace_errors: []
}

export const NamespaceErrorsContext = React.createContext({
  namespace_errors: NamespaceErrorsDefaults.namespace_errors
  });