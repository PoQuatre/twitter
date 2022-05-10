import { useEffect, useState } from 'react';

export const App = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.text())
      .then((res) => setResponse(res));
  }, []);

  return (
    <>
      <p>Hello from the client!</p>
      {response && <p>{response}</p>}
    </>
  );
};
