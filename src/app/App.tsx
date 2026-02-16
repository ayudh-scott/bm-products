import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { ProductsProvider } from "./context/ProductsContext";
import Particles from "./components/Particles";

export default function App() {
  return (
    <>
      <ProductsProvider>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            particleCount={180}
            particleSpread={8}
            speed={0.08}
            particleColors={["#ffffff", "#e5e5e5", "#a3a3a3"]}
            alphaParticles
            particleBaseSize={80}
            sizeRandomness={0.8}
            cameraDistance={18}
            disableRotation={false}
            pixelRatio={1}
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10 min-h-screen bg-black">
          <RouterProvider router={router} />
        </div>
      </ProductsProvider>
      <Toaster position="top-center" />
    </>
  );
}
