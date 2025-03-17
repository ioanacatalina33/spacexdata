import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ShipComponent } from './ShipComponent';
import { shipMock } from '../utils/mocks';

describe('ShipComponent renders correctly', () => {
  it('should show correct ship data', () => {
    const shipComponent = render(<ShipComponent ship={shipMock} />);
    expect(shipComponent.getByText('Name: ShipX')).toBeInTheDocument();
    expect(shipComponent).toMatchSnapshot();
  });
});
