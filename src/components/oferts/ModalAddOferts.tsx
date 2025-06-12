import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { FC, useState } from "react";
import { BiMoney, BiRename } from "react-icons/bi";
import { Oferts } from "../../type";
import { toast } from "sonner";
import { createOfertRequest, editOfertRequest } from "../../services/oferts";

interface Props {
  id?: string;
  description?: string;
  setOferts: React.Dispatch<React.SetStateAction<Oferts[] | null>>;
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddOferts: FC<Props> = ({
  isOpen,
  onClose,
  id,
  description,
  setOferts,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const inputName = data["name"] as string;
    const inputPrice = data["price"] as string;

    // Validaciones
    if (!inputName) {
      toast.error("La descripcion es requerida");
      setLoading(false);
      return;
    }
    if (!inputPrice) {
      toast.error("El precio es requerido.");
      setLoading(false);
      return;
    }
    if (id) {
      editOfertRequest(id, {
        price: parseInt(inputPrice),
        description: inputName,
      })
        .then((res) => {
          setOferts((prev) => {
            if (!prev) {
              return null;
            }
            const ofert = res.data.data;

            const ofertFilter = prev.filter((prevOfert) => {
              return prevOfert.id !== id;
            });
            return [ofert, ...ofertFilter];
          });
          toast.success("Oferta editada con exito");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al editar la Oferta");
        })
        .finally(() => {
          setLoading(false);
          onClose();
        });
    }

    if (!id) {
      createOfertRequest({
        price: parseInt(inputPrice),
        description: inputName,
      })
        .then((res) => {
          setOferts((prev) => {
            return prev ? [res.data.data, ...prev] : null;
          });
          toast.success("Oferta creada con exito");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al crear la Oferta");
        })
        .finally(() => {
          setLoading(false);
          onClose();
        });
    }
  };

  return (
    <>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./Logo.png" alt="Logo Hostal" className="w-10 h-8" />
                {!id && <h1 className="text-2xl font-bold">Agregar Oferta</h1>}
                {id && <h1 className="text-2xl font-bold">Editar Oferta</h1>}
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center w-full gap-4">
                    <Textarea
                      autoFocus
                      name="name"
                      endContent={
                        <BiRename className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Description"
                      placeholder="Entra la descripcion"
                      variant="bordered"
                      labelPlacement="outside"
                      defaultValue={description}
                    />
                    <Input
                      endContent={
                        <BiMoney className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Precio"
                      name="price"
                      placeholder="Entra el precio"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </div>

                  <div className="flex min-w-full justify-end mt-5 gap-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      {loading && <Spinner color="default" />}
                      {!loading && (
                        <span className=" font-semibold">Guardar</span>
                      )}{" "}
                    </Button>
                  </div>
                </Form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddOferts;
