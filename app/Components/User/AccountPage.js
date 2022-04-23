import React from 'react';
import { connect } from 'react-redux';

import UserPanel from './UserPanel';
import AnonPanel from './AnonPanel';

const AccountPage = (props) => {
  return (
    <section>
      {
        (props.auth.id)
        ?  <UserPanel />
        :  <AnonPanel />
      }
    </section>
  )
}
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(AccountPage);
