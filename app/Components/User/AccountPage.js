import React from 'react';

import UserMenu from './UserMenu';
import UserPanel from './UserPanel';

const AccountPage = (props) => {
  return (
    <section>
      <div className="highlighted">
        <UserMenu />
        <UserPanel />
      </div>
    </section>
  )
}

export default AccountPage;
