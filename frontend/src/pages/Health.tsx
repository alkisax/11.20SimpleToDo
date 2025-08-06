import { useEffect, useState } from 'react';
import { checkHealth } from '../utils/api';

const Health = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkHealth()
      .then(setStatus)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Health Check</h2>
      {status && <p>Backend status: ✅ {status}</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </div>
  );
};

export default Health;
