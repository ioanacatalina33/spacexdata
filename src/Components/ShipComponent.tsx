import { Ship } from 'store/types/spaceXTypes';

export function ShipComponent({ ship }: { ship: Ship }) {
  return (
    <ul style={{ textAlign: 'left' }}>
      <li>Name: {ship.name}</li>
      <li> Model: {ship.model}</li>
      <li>Type: {ship.type}</li>
      <li> Year: {ship.yearBuild}</li>
    </ul>
  );
}
