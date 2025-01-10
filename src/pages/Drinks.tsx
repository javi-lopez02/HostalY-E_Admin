import { Spinner } from "@nextui-org/react";
import { lazy, Suspense } from "react";

const DrinksTable = lazy(() => import("../components/drinks/DrinksTable"));

export default function Drinks() {
  return (
    <div className="pt-20 p-16 bg-neutral-100 min-h-screen">
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="primary" />
          </div>
        }
      >
        <DrinksTable />
      </Suspense>
    </div>
  );
}
