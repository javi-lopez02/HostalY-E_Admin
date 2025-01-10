import { Spinner } from "@nextui-org/react";
import { lazy, Suspense } from "react";

const GalleryTable = lazy(() => import("../components/gallery/GalleryTable"));

export default function Gallery() {
  return (
    <div className="pt-20 p-16 bg-neutral-100 min-h-screen">
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="primary" />
          </div>
        }
      >
        <GalleryTable />
      </Suspense>
    </div>
  );
}
