import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { FC, useEffect, useMemo, useState } from "react";
import { getOrderItemsRequest } from "../../services/order";
import { OrderItem } from "../../type";
import { toast } from "sonner";

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const columns = [
  { name: "IMAGEN", uid: "image" },
  { name: "DESCRIPCION", uid: "description" },
  { name: "CANTIDAD", uid: "quantity" },
  { name: "PRECIO TOTAL", uid: "totalPrice" },
];

const ModalProductsView: FC<Props> = ({ id, isOpen, onClose }) => {
  const [items, setItems] = useState<OrderItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrderItemsRequest(id)
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al cargar los productos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const itemsFilter = useMemo((): OrderItem[] => {
    if (!items) {
      return [];
    }

    return items;
  }, [items]);

  const renderCell = React.useCallback(
    (item: OrderItem, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof OrderItem];

      switch (columnKey) {
        case "image":
          if (item.ofert) {
            return (
              <img className="w-8 h-8 rounded-full" src="/Logo.png" alt="" />
            );
          } else if (item.dessert) {
            return (
              <img
                className="w-8 h-8 rounded-full"
                src={item.dessert.imagen}
                alt=""
              />
            );
          } else {
            return (
              <img
                className="w-8 h-8 rounded-full"
                src={item.gastronomic.imagen}
                alt=""
              />
            );
          }
        case "description":
          if (item.ofert) {
            return <div>{item.ofert.description}</div>;
          } else if (item.dessert) {
            return <div>{item.dessert.description}</div>;
          } else {
            return <div>{item.gastronomic.description}</div>;
          }
        case "quantity":
          return (
            <div className="flex  justify-center">
              <p className="text-bold text-sm capitalize">{item.quantity}</p>
            </div>
          );
        case "totalPrice":
          return (
            <div className="flex justify-center ">
              <p className="text-bold text-sm capitalize">{item.price}</p>
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    []
  );

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./Logo.png" alt="Logo Hostal" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Detalles de la Orden</h1>
              </ModalHeader>
              <ModalBody>
                <div className="w-full">
                  <Table
                    aria-label="Example table with custom cells"
                    shadow="none"
                    isHeaderSticky
                    classNames={{ wrapper: "max-h-[500px] max-w-full" }}
                  >
                    <TableHeader columns={columns}>
                      {(column) => (
                        <TableColumn
                          key={column.uid}
                          align={
                            column.uid === "quantity" ||
                            column.uid === "totalPrice"
                              ? "center"
                              : "start"
                          }
                        >
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody
                      items={itemsFilter}
                      isLoading={loading}
                      loadingContent={<Spinner color="warning" />}
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
                  <div className="flex justify-end gap-3 py-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalProductsView;
