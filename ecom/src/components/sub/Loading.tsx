import { FallingLines } from "react-loader-spinner"

const Loading = () => {
  return (
    <div className="loading">
      <FallingLines
        color="#808080"
        width="100"
        visible={true}
      />
    </div>
  );
}

export default Loading