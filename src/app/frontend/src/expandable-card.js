import React, { useState } from 'react';

function ExpandableCard({ title, content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="expandable-card">
      <h3>{title}</h3>
      <p>{isExpanded ? content : content.substring(0, 100) + '...'}</p>
      <button onClick={toggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
    </div>
  );
}

export default ExpandableCard; 