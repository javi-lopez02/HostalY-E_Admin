import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { BiSolidDrink } from "react-icons/bi";
import { FaHome, FaUser } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";
import { GrGallery } from "react-icons/gr";
import { IoFastFoodSharp } from "react-icons/io5";
import { PiBowlFoodFill } from "react-icons/pi";
import { RiGalleryFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useUser from "../../customHooks/useUser";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import useOferts from "../../customHooks/useOferts";
import useGastronomics from "../../customHooks/useGastronomics";
import useDesserts from "../../customHooks/useDesserts";
import useDrinks from "../../customHooks/useDrinks";
import useSnacks from "../../customHooks/useSnacks";
import useEvents from "../../customHooks/useEvents";
import useGallery from "../../customHooks/useGallery";

export default function DrawerSideBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { users } = useUser();
  const { oferts } = useOferts();
  const { gastronomics } = useGastronomics();
  const { desserts } = useDesserts();
  const { drinks } = useDrinks();
  const { snacks } = useSnacks();
  const { events } = useEvents();
  const { gallery } = useGallery();
  const { logout } = useAuth();

  return (
    <>
      <button
        onClick={onOpen}
        className="inline p-2 mr-3 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 12"
        >
          {" "}
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h14M1 6h14M1 11h7"
          />{" "}
        </svg>
      </button>
      <Drawer
        isOpen={isOpen}
        size="xs"
        placement="left"
        backdrop="transparent"
        hideCloseButton
        onOpenChange={onOpenChange}
      >
        <DrawerContent className="dark:bg-gray-800 fixed bg-white top-16">
          {() => (
            <>
              <DrawerBody>
                <div className="py-4 overflow-y-hidden">
                  <ul className="space-y-2 font-medium">
                    <li>
                      <Link
                        to={"/"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <FaHome />
                        <span className="ms-3">Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/users"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <FaUser />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Users
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          {users && users.length}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/oferts"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <GiTicket />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Oferts
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          {oferts && oferts.length}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/gastronomics"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <FaBowlFood />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Gastronomic
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          {gastronomics && gastronomics.length}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/drinks"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <BiSolidDrink />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Drinks
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          {drinks && drinks.length}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/snacks"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <IoFastFoodSharp />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Snacks
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          {snacks && snacks.length}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/desserts"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <PiBowlFoodFill />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Desserts
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          {desserts && desserts.length}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/gallery"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <RiGalleryFill />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Gallery
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          {gallery && gallery.length}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/events"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <GrGallery />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Events
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          {events && events.length}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  variant="solid"
                  startContent={<MdLogout className="min-h-4 min-w-4" />}
                  color="danger"
                  onPress={logout}
                >
                  LogOut
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
