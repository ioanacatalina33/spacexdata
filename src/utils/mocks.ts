import { Launch, Ship } from 'store/types/spaceXTypes';

export const shipMock: Ship = {
  id: '123',
  model: 'ModelX',
  name: 'ShipX',
  yearBuild: '2022',
  type: 'typeX',
};

export const mockLaunches: Launch[] = [
  {
    name: 'Launch1',
    id: '1',
    details: 'details 1',
    success: false,
    rocketId: 'rocket1',
    ships: [
      {
        id: '1',
        model: 'Model1',
        name: 'ship1',
        type: 'typee1',
        yearBuild: '2022',
      },
    ],
  },
  {
    name: 'Launch2',
    id: '2',
    details: 'details 2',
    success: true,
    rocketId: 'rocket2',
    ships: [],
  },
  {
    name: 'Launch3',
    id: '3',
    details: 'details 3',
    success: true,
    rocketId: 'rocket3',
    ships: [],
  },
  {
    name: 'Launch4',
    id: '4',
    details: 'details 4',
    success: true,
    rocketId: 'rocket4',
    ships: [
      {
        id: '2',
        model: 'Model2',
        name: 'ship2',
        type: 'typee2',
        yearBuild: '2022',
      },
    ],
  },
];
