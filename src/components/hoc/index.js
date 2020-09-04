import React from 'react';

import ServiceContext from '../context'


const WithRestoService = () => (Wrapped) => {
    return (props) => {
        return (
          <ServiceContext.Consumer>
              {
                  (Service) => {
                      return <Wrapped {...props} Service={Service}/>
                  }
              }
          </ServiceContext.Consumer>
        )
    }
};

export default WithRestoService;