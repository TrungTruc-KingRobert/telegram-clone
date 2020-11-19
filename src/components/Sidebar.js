import React, { useState, useEffect } from 'react';
import SidebarThread from './SidebarThread';
import db, { auth } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/lib/userSlice';
import ModalAlert from './Alert/ModalAlert';

import { Search, 
  BorderColorOutlined, 
  PhoneOutlined, 
  QuestionAnswerOutlined, 
  Settings } from '@material-ui/icons';
import { IconButton, Avatar } from '@material-ui/core';

import './Sidebar.css';

const Sidebar = () => {
  const user = useSelector(selectUser);

  const [threads, setThreads] = useState([]);

  const [showModalAlert, setShowModalAlert] = useState(false);

  useEffect(() => {
    db.collection('threads')
      .onSnapshot((snapshot) => setThreads(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))))
    console.log('user:', user);
  }, []);

  const addThread = () => {
    const threadName = prompt("Enter a thread name.");
    if(threadName) {
      db.collection('threads').add({
        threadName: threadName,
      })
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__search">
          <Search 
            className="sidebar__searchIcon" 
            onClick={() => setShowModalAlert(true)}
          />
          <input 
            placeholder="Search..." 
            className="sidebar__input" 
          />
        </div>
        <IconButton 
          variant="outlined" 
          id="sidebar__button"
        >
          <BorderColorOutlined onClick={addThread} />
        </IconButton>
      </div>
      <div className="sidebar__threads">
        {threads.map(({id, data: { threadName } }) => (
          <SidebarThread 
            key={id} 
            id={id} 
            threadName={threadName} 
          />
        ))}    
      </div>
      <div className="sidebar__bottom">
        <Avatar 
          className="sidebar__bottom__avatar"
          onClick={() => auth.signOut()}
          src={user.photo}
        />
        <IconButton onClick={() => setShowModalAlert(true)} >
          <PhoneOutlined />
        </IconButton>

        <IconButton onClick={() => setShowModalAlert(true)} >
          <QuestionAnswerOutlined />
        </IconButton>

        <IconButton onClick={() => setShowModalAlert(true)} >
          <Settings />
        </IconButton>
      </div>
      {showModalAlert ? <ModalAlert show={showModalAlert}
        content="Tính năng này đang được phát triển!"
        setShow={setShowModalAlert} /> : null}
    </div>
  );
};

export default Sidebar;
