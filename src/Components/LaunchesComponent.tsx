import { Launch } from 'store/types/spaceXTypes';
import LaunchComponent from './LaunchComponent';
import { useMemo, useState } from 'react';

export default function LaunchesComponent({
  launches,
}: {
  launches: Launch[];
}) {
  const [showOnlyWithShips, setShowOnlyWithShips] = useState(false);

  const filteredLaunches = useMemo(
    () =>
      showOnlyWithShips
        ? launches.filter((launch) => !!launch.ships.length)
        : launches,
    [launches, showOnlyWithShips],
  );
  return (
    <div>
      <h1>Launches</h1>
      <button
        style={{ minWidth: '15rem' }}
        onClick={() => setShowOnlyWithShips((prev) => !prev)}
      >
        {showOnlyWithShips ? 'Show all' : 'Show only with Ships'}
      </button>
      <h4>Showing: {filteredLaunches.length} launches</h4>
      <table>
        {filteredLaunches.map((launch, i) => (
          <tr
            key={launch.id}
            style={{ backgroundColor: i % 2 ? '#cceeff' : '#d7ffcc' }}
          >
            <LaunchComponent launch={launch} />
          </tr>
        ))}
      </table>
    </div>
  );
}
