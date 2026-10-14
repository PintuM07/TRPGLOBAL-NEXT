'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './WebinarPopup.css';

export default function WebinarPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="wp-backdrop" onClick={dismiss}>
      <div className="wp-card" onClick={(e) => e.stopPropagation()}>
        <button className="wp-close" onClick={dismiss} aria-label="Close">✕</button>
        <Image
          src="/assets/oracle-aiworld-banner.jpg"
          alt="Meet us at Oracle AI World - Las Vegas, 25th–28th October"
          width={900}
          height={506}
          className="wp-image"
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </div>
    </div>
  );
}
