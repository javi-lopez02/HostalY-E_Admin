import {
  ChangeEvent,
  Key,
  SVGProps,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { type Users } from "../../type";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
} from "../Icons";
import ModalAddUser from "./ModalAddUser";
import useUser from "../../customHooks/useUser";
import { toast } from "sonner";
import { deleteUsersRequest } from "../../services/user";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function Capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const columns = [
  { name: "NOMBRE", uid: "username", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "CREADO EN: ", uid: "createdAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const roleOptions = [
  { name: "Admin", uid: "admin" },
  { name: "Usuario", uid: "user" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "username",
  "role",
  "actions",
  "createdAt",
];

export default function UsersTable() {
  const { users, error, loading, setUsers } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filterValue, setFilterValue] = useState("");

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [roleFilter, setRoleFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const [selectedUser, setSelectedUser] = useState<Users | null>(null);

  const handleAddProduct = () => {
    setSelectedUser(null);
    onOpen();
  };

  const handleEditProduct = (user: Users) => {
    setSelectedUser(user);
    onOpen();
  };

  const formatearFecha = (isoString: string) => {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const fecha = new Date(isoString);

    const dia = fecha.getUTCDate();
    const mes = meses[fecha.getUTCMonth()];
    const anio = fecha.getUTCFullYear();

    return `${dia} ${mes} ${anio}`;
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (!users) {
      return [];
    }
    let filteredProducts = [...users];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter(
        (user) =>
          user.username.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.role.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      roleFilter !== "all" &&
      Array.from(roleFilter).length !== roleOptions.length
    ) {
      filteredProducts = filteredProducts.filter((user) =>
        Array.from(roleFilter).includes(user.role.toLowerCase())
      );
    }
    return filteredProducts;
  }, [users, hasSearchFilter, roleFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems].sort((a: Users, b: Users) => {
      const first = a[sortDescriptor?.column as never] as number;
      const second = b[sortDescriptor?.column as never] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor?.direction === "descending" ? -cmp : cmp;
    });

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sorted.slice(start, end);
  }, [
    filteredItems,
    page,
    rowsPerPage,
    sortDescriptor?.column,
    sortDescriptor?.direction,
  ]);

  const handleDelete = (id: string) => {
    deleteUsersRequest(id)
      .then(() => {
        toast.success("Usuario eliminado con exito");
        setUsers((prev) => {
          return prev
            ? prev.filter((user) => {
                return user.id !== id;
              })
            : null;
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al eliminar el Usuario");
      });
  };

  const renderCell = useCallback((user: Users, columnKey: Key) => {
    const cellValue = user[columnKey as keyof Users];

    switch (columnKey) {
      case "username":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.image }}
            name={
              <span
                style={{
                  display: "inline-block",
                  maxWidth: "250px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.username}
              </span>
            }
          ></User>
        );
      case "createdAt": {
        return (
          <div className="flex justify-center">
            <p className={`text-bold text-small capitalize`}>
              {formatearFecha(user.createdAt)}
            </p>
          </div>
        );
      }
      case "role":
        return (
          <div className="flex">
            <p className="text-bold text-small capitalize">{user.role}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Edit user">
              <button
                onClick={() => handleEditProduct(user)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <button
                onClick={() => {
                  handleDelete(user.id);
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return String(cellValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      console.log(e.target.value);
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            color="primary"
            className="w-full sm:max-w-[44%]"
            placeholder="Búsqueda..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Rol
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}
              >
                {roleOptions.map((role) => (
                  <DropdownItem key={role.uid} className="capitalize">
                    {Capitalize(role.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {Capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<PlusIcon />}
              onPress={handleAddProduct}
            >
              Nuevo Usuario
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users?.length} usuarios
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por páginas:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    onSearchChange,
    roleFilter,
    visibleColumns,
    onOpen,
    users?.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="md"
            variant="flat"
            onPress={onPreviousPage}
            color="danger"
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="md"
            variant="flat"
            onPress={onNextPage}
            color="success"
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <>
      {error && error.map((err) => toast.error(err))}

      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[670px]",
        }}
        color="danger"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={
                column.uid === "actions" ||
                column.uid === "createdAt" ||
                column.uid === "order" ||
                column.uid === "status"
                  ? "center"
                  : "start"
              }
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner color="white" />}
          emptyContent={"No users found"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalAddUser
        isOpen={isOpen}
        onClose={onClose}
        setUsers={setUsers}
        {...selectedUser}
      />
    </>
  );
}
