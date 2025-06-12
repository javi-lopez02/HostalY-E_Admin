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
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
  Spinner,
  User,
  useDisclosure,
} from "@heroui/react";
import { type Snacks } from "../../type";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
} from "../Icons";
import useSnacks from "../../customHooks/useSnacks";
import { toast } from "sonner";
import ModalAddSnacks from "./ModalAddSnacks";
import { deleteSnackRequest } from "../../services/snacks";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function Capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const columns = [
  { name: "DESCRIPCION", uid: "name", sortable: true },
  { name: "PRECIO", uid: "price", sortable: true },
  { name: "CREADO EN: ", uid: "createdAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["price", "name", "actions", "createdAt"];

export default function SnacksTable() {
  const { snacks, error, loading, setSnacks } = useSnacks();
  const [selectedSnack, setSelectedSnack] = useState<Snacks | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filterValue, setFilterValue] = useState("");

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

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
    if (!snacks) {
      return [];
    }
    let filteredProducts = [...snacks];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((snack) =>
        snack.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredProducts;
  }, [snacks, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems].sort((a: Snacks, b: Snacks) => {
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

  const renderCell = useCallback(
    (snack: Snacks, columnKey: Key) => {
      const cellValue = snack[columnKey as keyof Snacks];

      const handleEditSnack = (snack: Snacks) => {
        setSelectedSnack(snack);
        onOpen();
      };

      const handleDelete = (id: string) => {
        deleteSnackRequest(id)
          .then(() => {
            toast.success("Merienda eliminada con exito");
            setSnacks((prev) => {
              return prev
                ? prev.filter((snack) => {
                    return snack.id !== id;
                  })
                : null;
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error al eliminar la Merienda");
          });
      };

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: snack.imagen }}
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
                  {snack.name}
                </span>
              }
            />
          );

        case "price":
          return (
            <div className="flex">
              <p className="text-bold text-small capitalize">${snack.price}</p>
            </div>
          );
        case "createdAt": {
          return (
            <div className="flex justify-center">
              <p className={`text-bold text-small capitalize`}>
                {formatearFecha(snack.createdAt)}
              </p>
            </div>
          );
        }
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip content="Edit snack">
                <button
                  onClick={() => handleEditSnack(snack)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Delete snack">
                <button
                  onClick={() => handleDelete(snack.id)}
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
    },
    [onOpen, setSnacks]
  );

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
    const handleAddProduct = () => {
      setSelectedSnack(null);
      onOpen();
    };
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            color="warning"
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
              color="warning"
              endContent={<PlusIcon />}
              onPress={handleAddProduct}
            >
              Nueva Merienda
            </Button>
            <ModalAddSnacks
              isOpen={isOpen}
              onClose={onClose}
              setSnacks={setSnacks}
              {...selectedSnack}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {snacks?.length} meriendas
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
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    snacks?.length,
    onRowsPerPageChange,
    onClear,
    isOpen,
    onClose,
    onOpen,
    setSnacks,
    selectedSnack,
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
          emptyContent={"No snacks found"}
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
    </>
  );
}
