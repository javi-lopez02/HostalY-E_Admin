import useDesserts from "../../customHooks/useDesserts";
import useDrinks from "../../customHooks/useDrinks";
import useEvents from "../../customHooks/useEvents";
import useGallery from "../../customHooks/useGallery";
import useGastronomics from "../../customHooks/useGastronomics";
import useOferts from "../../customHooks/useOferts";
import useSnacks from "../../customHooks/useSnacks";
import useUser from "../../customHooks/useUser";

export default function Statistics() {
  const { users } = useUser();
  const { oferts } = useOferts();
  const { gastronomics } = useGastronomics();
  const { desserts } = useDesserts();
  const { snacks } = useSnacks();
  const { drinks } = useDrinks();
  const { gallery } = useGallery();
  const { events } = useEvents();

  const stats = [
    {
      value: `${users?.length}`,
      label: "Total Users",
      description: "Registered users on the platform.",
    },
    {
      value: `${oferts?.length}`,
      label: "Total Oferts",
      description: "Total available oferts.",
    },
    {
      value: `${gastronomics?.length}`,
      label: "Total Gastronomics",
      description: "Total available gastronomics oferts.",
    },
    {
      value: `${desserts?.length}`,
      label: "Total Desserts",
      description: "Total available desserts.",
    },
    {
      value: `${snacks?.length}`,
      label: "Total Snacks",
      description: "Registered snacks on hostal menu.",
    },
    {
      value: `${drinks?.length}`,
      label: "Total Drinks",
      description: "Registered drinks on hostal menu.",
    },
    {
      value: `${gallery?.length}`,
      label: "Total Gallery-Images",
      description: "Total house images, including pool, ranch and grill.",
    },
    {
      value: `${events?.length}`,
      label: "Total Events-Images",
      description: "Total events images.",
    },
  ];

  return (
    <div className="bg-gray-50 p-8 min-h-[600px] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Platform Statistics
      </h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300"
          >
            <h3 className="text-gray-800 text-4xl font-extrabold">
              {stat.value}
              <span className="text-blue-600"></span>
            </h3>
            <p className="text-lg font-semibold mt-4 text-gray-700">
              {stat.label}
            </p>
            <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
