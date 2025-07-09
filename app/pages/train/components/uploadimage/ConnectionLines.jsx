import React from "react";

const ConnectionLines = () => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      style={{ top: '0px' }}
    >
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
          refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
        </marker>
      </defs>
      
      {/* Lines to top row classes */}
      <line
        x1="50%"
        y1="20"
        x2="25%"
        y2="120"
        stroke="#9CA3AF"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <line
        x1="50%"
        y1="20"
        x2="75%"
        y2="120"
        stroke="#9CA3AF"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      
      {/* Lines to bottom row classes */}
      <line
        x1="50%"
        y1="20"
        x2="25%"
        y2="280"
        stroke="#9CA3AF"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <line
        x1="50%"
        y1="20"
        x2="75%"
        y2="280"
        stroke="#9CA3AF"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

export default ConnectionLines;