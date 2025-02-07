import Layout from "@components/Layout/Layout";
import Canvas from "@components/Canvas/Canvas";
import CanvasControls from "@components/CanvasControls/CanvasControls";

const App = () => {
  return (
    <Layout>
      <Canvas />
      <CanvasControls />
    </Layout>
  );
};

export default App;
