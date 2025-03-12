import { Launch } from 'store/types/spaceXTypes';
import { ShipsComponent } from './ShipsComponent';

export default function LaunchComponent({ launch }: { launch: Launch }) {
  return (
    <>
      <td>
        <h3>Name: {launch.name}</h3>
      </td>
      <td style={{ minWidth: '10rem', padding: '1rem' }}>
        success: {launch.success ? 'yes' : 'no'}
      </td>
      <td style={{ minWidth: '10rem', padding: '1rem' }}>{launch.details}</td>
      <td style={{ minWidth: '10rem', padding: '1rem' }}>
        rocketId: {launch.rocketId}
      </td>
      <td style={{ minWidth: '10rem', padding: '1rem' }}>
        Ships: <ShipsComponent ships={launch.ships} />
      </td>
    </>
  );
}
