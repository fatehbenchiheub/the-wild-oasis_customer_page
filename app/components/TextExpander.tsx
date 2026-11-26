'use client';

import { ReactNode, useState } from 'react';

interface TextExpanderProps {
  children: ReactNode;
}

function TextExpander({ children }: TextExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');
  const shouldTruncate = words.length > 40;

  const displayText = isExpanded || !shouldTruncate ? text : `${words.slice(0, 40).join(' ')}...`;

  return (
    <span>
      {displayText}{' '}
      <button
        type="button"
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
}

export default TextExpander;
