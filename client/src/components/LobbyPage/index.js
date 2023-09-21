import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './LobbyPage.css';

function LobbyPage() {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [activeCodeBlocks, setActiveCodeBlocks] = useState({});


  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL);

    // Initial fetch for all code blocks
    const fetchData = async () => {
      console.log("fetching data lobbyPage from ", process.env.REACT_APP_SERVER_URL);
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + '/api/codeblocks');
        const data = await response.json();
        setCodeBlocks(data);
      } catch (error) {
        console.error('Error fetching code blocks:', error);
      }
    };

    fetchData();

    // Listen for updates about which code blocks are active
    socket.on('codeBlockStatusUpdate', (updatedActiveCodeBlocks) => {
      console.log("[lobbyPage] updatedActiveCodeBlocks:", updatedActiveCodeBlocks)
      setActiveCodeBlocks(updatedActiveCodeBlocks);
    });

    return () => socket.disconnect();
  }, []);

  const renderAvailableCodeBlocks = () => {
    return codeBlocks.map((block) => (
      <a
        key={block.id}
        href={`/codeblock/${block.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="code-block">
        <h2>{block.title}</h2>
      </a>
    ));
  };

  const renderActiveCodeBlocks = () => {
    return codeBlocks.map((block) => {
      if (activeCodeBlocks[block.id]) {
        return (
          <a
            key={block.id}
            href={`/codeblock/${block.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="code-block editing">
            <h2>{block.title}</h2>
            <p>Session ID: {block.id}</p>
          </a>
        );
      }
      return null;
    });
  };

  return (
    <div className="lobby-container">
      <h1>Available Code Blocks</h1>
      <div className="code-block-grid">
        {renderAvailableCodeBlocks()}
      </div>

      <h2>Active Code Blocks</h2>
      <div className="code-block-grid">
        {renderActiveCodeBlocks()}
      </div>
    </div>
  );
}

export default LobbyPage;