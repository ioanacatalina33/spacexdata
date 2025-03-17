import { Ship } from 'store/types/spaceXTypes';
import { ShipComponent } from './ShipComponent';

export function ShipsComponent({ ships }: { ships: Ship[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {ships.map((ship) => (
        <ShipComponent ship={ship} key={ship.id} />
      ))}
    </div>
  );
}
