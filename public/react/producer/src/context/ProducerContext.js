import React from 'react';

export const ProducerDefaults = {
  producers: []
}

export const ProducerContext = React.createContext({
  producers: ProducerDefaults.producers
  });