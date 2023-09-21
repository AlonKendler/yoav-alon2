import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './CodeBlockPage.css';

function CodeBlockPage() {
  const { id } = useParams();

  const [codeBlock, setCodeBlock] = useState(null);
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);

    newSocket.on('connect', () => {
      console.log('Successfully connected to the server');
    });

    newSocket.on('connect_error', (error) => {
      console.log('Connection Error:', error);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [id]);

  useEffect(() => {
    if (socket) {
      socket.emit('joinSession', id);
    }
  }, [socket, id]);

  useEffect(() => {
    if (!socket) return;

    socket.on('roleAssignment', (role) => {
      console.log('roleAssignment ', role);
      if (role === 'mentor') {
        setIsMentor(true);
      }
    });

    socket.on('codeUpdate', (newCodeBlock) => {
      console.log(`[codeBlockPage] listening to codeUpdate event - of sessionId ${id} with NewCode: ${newCodeBlock.code}`);
      setCodeBlock(newCodeBlock);
    });
  }, [socket]);

  useEffect(() => {
    setIsMentor(window.localStorage.getItem('isMentor') === 'true');
    window.localStorage.setItem('isMentor', 'false');
  }, []);

  const handleCodeChange = (value) => {
    if (!isMentor && socket) {
      socket.emit('codeChange', { id, code: value });
    }
  };

  useEffect(() => {
    const fetchCodeBlockData = async () => {
      try {
        console.log("fetching data lobbyPage from ", `${process.env.REACT_APP_SERVER_URL}/api/codeblocks/${id}`);
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/codeblocks/${id}`);
        const data = await response.json();
        setCodeBlock(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching code blocks:', error);
        setLoading(false);
      }
    };

    fetchCodeBlockData();
  }, [id]);

  return (
    <div className="code-block-page">
      {isMentor && <div className="mentor-banner">You are viewing in read-only mode</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : codeBlock ? (
        <div className="code-editor-container">
          <h1>{codeBlock.title}</h1>
          <CodeMirror
            value={codeBlock.code}
            options={{
              lineNumbers: true,
              readOnly: isMentor,
              mode: 'javascript',
            }}
            onChange={(value, viewUpdate) => { handleCodeChange(value, viewUpdate) }}
          />
        </div>
      ) : (
        <div className="code-block-not-found">
          <h1>Code Block Not Found</h1>
          <p>The requested code block was not found.</p>
        </div>
      )}
    </div>
  );

}

export default CodeBlockPage;