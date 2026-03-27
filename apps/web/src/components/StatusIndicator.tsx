'use client';

export interface StatusIndicatorProps {
  state: 'loading' | 'online' | 'offline';
  timestamp?: string;
}

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZoneName: 'short',
  });
}

export function StatusIndicator({ state, timestamp }: StatusIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Dot + label row */}
      <div className="flex flex-row items-center justify-center gap-[10px]">
        {state === 'loading' && (
          <span
            className="animate-pulse flex-shrink-0 rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor: '#E4E9ED',
            }}
          />
        )}
        {state === 'online' && (
          <span
            className="flex-shrink-0 rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor: '#22C55E',
              boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.15)',
            }}
          />
        )}
        {state === 'offline' && (
          <span
            className="flex-shrink-0 rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor: '#EF4444',
            }}
          />
        )}

        <span
          className="font-montserrat font-semibold text-base sm:text-base"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: '16px',
            color:
              state === 'loading'
                ? '#6D7B87'
                : '#1B1B1B',
          }}
        >
          {state === 'loading' && 'Checking...'}
          {state === 'online' && 'PBT Systems Online'}
          {state === 'offline' && 'API Unreachable'}
        </span>
      </div>

      {/* Timestamp block — online only */}
      {state === 'online' && timestamp && (
        <div className="mt-4 text-center">
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              color: '#6D7B87',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 4,
            }}
          >
            Last checked
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              color: '#1B1B1B',
            }}
          >
            {formatTimestamp(timestamp)}
          </p>
        </div>
      )}

      {/* Offline subtext */}
      {state === 'offline' && (
        <p
          className="mt-2 text-center"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: '13px',
            color: '#6D7B87',
          }}
        >
          Unable to reach PBT systems. Please try again shortly.
        </p>
      )}
    </div>
  );
}
