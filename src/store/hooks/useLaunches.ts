import { useSelector } from 'react-redux';
import { fetchLaunches } from 'store/reducers/spaceXSlice';
import { RootState, useAsyncDispatch } from 'store/store';
import { StatusTypes } from 'store/types/genericTypes';
import { Launch } from 'store/types/spaceXTypes';
import { OperationResult } from './types';

export function useLaunches(): OperationResult<Launch[]> {
  const status = useSelector(
    (state: RootState) => state.spaceX.statuses[StatusTypes.LAUNCH],
  );

  const launches = useSelector((state: RootState) => state.spaceX.launches);

  const dispatch = useAsyncDispatch();

  const handler = () => {
    dispatch(fetchLaunches());
  };

  return [
    {
      data: launches,
      loading: status?.loading ?? false,
      error: status?.error ?? false,
      errorMessage: status?.errorMessage ?? '',
    },
    handler,
  ];
}
