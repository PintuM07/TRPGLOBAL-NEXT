'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './WebinarPopup.css';

const WEBINAR_URL = 'https://zoom.us/webinar/register/WN_x2PKrKQHTHqq-kNZWOssIw#/registration';
const STORAGE_KEY = 'webinar_popup_dismissed';

export default function WebinarPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    // const t = setTimeout(() => setVisible(true), 3000);
    // return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="wp-backdrop" onClick={dismiss}>
      <div className="wp-card" onClick={(e) => e.stopPropagation()}>
        <button className="wp-close" onClick={dismiss} aria-label="Close">✕</button>
        <a href={WEBINAR_URL} target="_blank" rel="noopener noreferrer" onClick={dismiss}>
          <Image
            src="/assets/webiner.jpg"
            alt="Register for our webinar"
            width={600}
            height={400}
            className="wp-image"
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </a>
      </div>
    </div>
  );
}
