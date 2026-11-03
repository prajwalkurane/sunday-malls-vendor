'use client';

import type { ReactNode } from 'react';

export default function IPhone17Frame({ children }: { children: ReactNode }) {
  return (
    <main className="iphone-presentation">
      <div className="iphone-device" aria-label="Sunday Malls iPhone 17 preview">
        <div className="iphone-screen">
          <div className="iphone-dynamic-island" aria-hidden="true">
            <span className="iphone-camera" />
          </div>
          <div className="iphone-screen-content">{children}</div>
          <div className="iphone-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
