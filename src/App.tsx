import Layout from "@/components/Layout/Layout";
import Canvas from "@/components/Canvas/Canvas";
import CanvasControls from "@/components/CanvasControls/CanvasControls";

export default function App() {
  return (
    <Layout>
      <Canvas />
      <CanvasControls />
    </Layout>
  );
}
