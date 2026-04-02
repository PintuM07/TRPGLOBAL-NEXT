'use client';

import React from 'react';
import './Logo.css';

export default function Logo({ size = 'sm', className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`logo logo--${size} ${className}`.trim()} {...rest}>
      <img
        src="/assets/TRPGLOBAL_NEWUPDATE 2 5.png"
        alt="TRP Global"
        className="logo-img"
        draggable={false}
      />
    </Tag>
  );
}
