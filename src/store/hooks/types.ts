export type OperationResult<D, H = () => void> = [
  { data: D; loading: boolean; error: boolean; errorMessage: string },
  H,
];
