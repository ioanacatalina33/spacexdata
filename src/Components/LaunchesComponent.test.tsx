import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockLaunches } from '../utils/mocks';
import LaunchesComponent from './LaunchesComponent';
import userEvent from '@testing-library/user-event';

describe('LaunchesComponent tests', () => {
  it('should render correctly', () => {
    const shipComponent = render(<LaunchesComponent launches={mockLaunches} />);
    expect(shipComponent).toMatchSnapshot();
  });
});

it('should show 4 launches', () => {
  const shipComponent = render(<LaunchesComponent launches={mockLaunches} />);
  expect(shipComponent.getByText('Showing: 4 launches')).toBeInTheDocument();
});

it('should filter', async () => {
  const shipComponent = render(<LaunchesComponent launches={mockLaunches} />);
  expect(shipComponent.getByText('Showing: 4 launches')).toBeInTheDocument();
  const button = screen.getByRole('button', { name: 'Show only with Ships' });

  expect(button).toBeInTheDocument();

  userEvent.click(button);

  const component = await shipComponent.findByText('Showing: 2 launches');
  expect(component).toBeInTheDocument();
  expect(
    shipComponent.queryByText('Showing: 4 launches'),
  ).not.toBeInTheDocument();
});
