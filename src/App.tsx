import { Counter } from 'Components/Counter';
import Rocket from './Components/Rocket';
import { useLaunches } from 'store/hooks/useLaunches';
import { useEffect } from 'react';
import LaunchesComponent from 'Components/LaunchesComponent';

export default function App() {
  const [{ data: launches, loading, error, errorMessage }, getLaunches] =
    useLaunches();

  useEffect(() => {
    getLaunches();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>SpaceX Data</h1>
      {/* <Rocket /> */}
      <img
        style={{ width: '50%', margin: '2rem' }}
        src="/img/spaceX_launches.jpg"
        alt="SpaceX Launches"
      />
      {loading ? (
        <span>Loading..... please</span>
      ) : (
        <LaunchesComponent launches={launches} />
      )}
      {/* <Counter /> */}
    </div>
  );
}
