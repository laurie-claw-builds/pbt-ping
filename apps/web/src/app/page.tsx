'use client';

import { useEffect, useState } from 'react';
import { StatusIndicator } from '@/components/StatusIndicator';

interface HealthResponse {
  status: 'ok';
  timestamp: string;
}

type StatusState = 'loading' | 'online' | 'offline';

export default function StatusPage() {
  const [statusState, setStatusState] = useState<StatusState>('loading');
  const [timestamp, setTimestamp] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function checkHealth() {
      try {
        const res = await fetch('/api/health', { cache: 'no-store' });
        if (cancelled) return;

        if (!res.ok) {
          setStatusState('offline');
          return;
        }

        const data = (await res.json()) as HealthResponse;
        if (cancelled) return;

        if (data.status === 'ok') {
          setTimestamp(data.timestamp);
          setStatusState('online');
        } else {
          setStatusState('offline');
        }
      } catch {
        if (!cancelled) {
          setStatusState('offline');
        }
      }
    }

    void checkHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#F5F7F8' }}
    >
      {/* Status card */}
      <div
        className="w-full"
        style={{
          maxWidth: 480,
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '2px 2px 20px rgba(0, 0, 0, 0.05)',
          padding: '48px 40px',
        }}
      >
        {/* Brand label */}
        <div className="text-center" style={{ marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "'Izmir', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(24px, 4vw, 28px)',
              color: '#1B1B1B',
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            PBT
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '11px',
              color: '#6D7B87',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            System Status
          </p>
        </div>

        {/* Status indicator */}
        <StatusIndicator state={statusState} timestamp={timestamp} />
      </div>
    </main>
  );
}
