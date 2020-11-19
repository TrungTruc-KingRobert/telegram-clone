import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import db from '../firebase';
import { setThread } from '../features/lib/threadSlice';

import { Avatar } from '@material-ui/core';
import './SidebarThread.css';

const SidebarThread = ({ id, threadName }) => {
  const dispatch = useDispatch();
  const [threadInfo, setThreadInfo] = useState([]);

  useEffect(() => {
    db.collection('threads')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => 
        setThreadInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div 
      className="sidebarThread"
      onClick={() => {
        dispatch(
          setThread({
            threadId: id,
            threadName: threadName,
          })
        )
      }}
    >
      <Avatar src={threadInfo[0]?.photo} />
      <div className="sidebarThread__details">
        <h3 >{threadName}</h3>
        <p>Hello</p>
        <small className="sidebarThread__timestamp">
          {new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}
        </small>
      </div>
    </div>
  );
};

export default SidebarThread;
