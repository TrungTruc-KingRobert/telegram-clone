import React from 'react';
import SidebarThread from './SidebarThread';

import { Search, 
  BorderColorOutlined, 
  PhoneOutlined, 
  QuestionAnswerOutlined, 
  Settings } from '@material-ui/icons';
import { IconButton, Avatar } from '@material-ui/core';

import './Sidebar.css';

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__search">
          <Search className="sidebar__searchIcon" />
          <input placeholder="Search..." className="sidebar__input" />
        </div>
        <IconButton variant="outlined" id="sidebar__button">
          <BorderColorOutlined />
        </IconButton>
      </div>
      <div className="sidebar__threads">
        <SidebarThread />
        <SidebarThread />
        <SidebarThread />
        <SidebarThread />      
      </div>
      <div className="sidebar__bottom">
        <Avatar />
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
