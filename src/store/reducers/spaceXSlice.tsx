import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Status, Statuses, StatusTypes } from 'store/types/genericTypes';
import { Launch, Rocket, Ship } from 'store/types/spaceXTypes';

// add them in env file
const ENDPOINT_ROCKETS = 'https://api.spacexdata.com/v4/rockets';
const ENDPOINT_LAUNCHES = 'https://api.spacexdata.com/v4/launches';
const ENDPOINT_SHIPS = 'https://api.spacexdata.com/v4/ships';

async function fetchShip(id: string): Promise<Ship> {
  try {
    const response = await fetch(`${ENDPOINT_SHIPS}/${id}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      model: data.model,
      type: data.type,
      yearBuild: data.year_build,
    };
  } catch (error) {
    console.error('Error fetching crew member', error);
    throw error;
  }
}

async function fetchShips(ids: string[]): Promise<Ship[]> {
  try {
    const ships = await Promise.all(ids.map((id) => fetchShip(id)));
    return ships;
  } catch (error) {
    console.error('Error fetching crew members', error);
    throw error;
  }
}

async function parseLaunch(launch: any): Promise<Launch> {
  const ships = launch.ships.length ? await fetchShips(launch.ships) : [];
  return {
    id: launch.id,
    name: launch.name,
    dateUtc: launch.date_utc,
    rocketId: launch.rocket,
    details: launch.details,
    success: launch.success,
    ships,
  };
}

// Example async thunk: This could be an API call or any async logic
export const fetchLaunches = createAsyncThunk<Launch[]>(
  'spaceX/fetchLaunches',
  async () => {
    const response = await fetch(ENDPOINT_LAUNCHES);
    const data = await response.json();

    const launches = await Promise.all(
      data.map((launch: any) => parseLaunch(launch)),
    );

    return launches;
  },
);

export const fetchRockets = createAsyncThunk<Rocket[]>(
  'spaceX/fetchRockets',
  async () => {
    const response = await fetch(ENDPOINT_ROCKETS);
    const data = await response.json();
    const rockets: Rocket[] = data.map((rocket: any) => {
      return {
        id: rocket.id,
        name: rocket.name,
        type: rocket.type,
        costPerLaunch: rocket.cost_per_launch,
        successRatePct: rocket.success_rate_pct,
        active: rocket.active,
      };
    });
    return rockets;
  },
);

export interface SpaceXState {
  launches: Launch[];
  rockets: Rocket[];
  statuses: Statuses;
}

const initialState: SpaceXState = {
  launches: [],
  rockets: [],
  statuses: {},
};

export const spaceXSlice = createSlice({
  name: 'spaceX',
  initialState,
  reducers: {
    setLaunches: (state, action: PayloadAction<Launch[]>) => {
      state.launches = action.payload;
    },
    setRockets: (state, action: PayloadAction<Rocket[]>) => {
      state.rockets = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<{ type: StatusTypes; status: Status }>,
    ) => {
      state.statuses[action.payload.type] = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.statuses[StatusTypes.LAUNCH] = { loading: true, error: false };
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.statuses[StatusTypes.LAUNCH] = { loading: false, error: false };
        state.launches = action.payload; // Store the fetched data
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.statuses[StatusTypes.LAUNCH] = {
          loading: false,
          error: true,
          errorMessage: action.error.message,
        };
      })
      .addCase(fetchRockets.pending, (state) => {
        state.statuses[StatusTypes.ROCKET] = { loading: true, error: false };
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.statuses[StatusTypes.ROCKET] = { loading: false, error: false };
        state.rockets = action.payload; // Store the fetched data
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.statuses[StatusTypes.ROCKET] = {
          loading: false,
          error: true,
          errorMessage: action.error.message,
        };
      });
  },
});

// Action creators are generated for each case reducer function
export const { setLaunches, setRockets, setStatus } = spaceXSlice.actions;

export default spaceXSlice.reducer;
