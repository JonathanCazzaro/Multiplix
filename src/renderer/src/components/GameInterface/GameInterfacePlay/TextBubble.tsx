import React, { useState } from 'react';
import { IoChevronForwardSharp as ForwardIcon, IoChevronBack as BackIcon } from 'react-icons/io5';

const TextBubble: React.FC<{ content: JSX.Element[] }> = ({ content }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="gameinterface__playboard__header__bubble">
      {content[index]}
      {content.length > 1 && (
        <div className="gameinterface__playboard__header__bubble__buttons">
          <button onClick={() => setIndex(index - 1)} style={{ visibility: index !== 0 ? 'visible' : 'hidden' }}>
            <BackIcon />
          </button>
          <button
            onClick={() => setIndex(index + 1)}
            style={{ visibility: index < content.length - 1 ? 'visible' : 'hidden' }}
          >
            <ForwardIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default TextBubble;
