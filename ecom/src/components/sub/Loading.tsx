import { FallingLines } from "react-loader-spinner"

const Loading = () => {
  return (
    <div className="loading">
      <FallingLines color="#E07E1B" width="100" visible={true} />
    </div>
  );
}

export default Loading