interface Props {
  error: Error;
}

const RoomsError = ({ error }: Props) => (
  <>
    <div>Fetching rooms has failed. The error:</div>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </>
);

export default RoomsError;
