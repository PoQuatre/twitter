import React from 'react';
import SidebarRight from '../sidebarRight/SidebarRight';
import NewTweet from '../newTweet/NewTweet';
import SidebarLeft from '../sidebarLeft/SidebarLeft';

function GlobalLayout() {
  return (
    <div className="row ">
      <SidebarLeft />
      <NewTweet />
      <SidebarRight />
    </div>
  );
}

export default GlobalLayout;
