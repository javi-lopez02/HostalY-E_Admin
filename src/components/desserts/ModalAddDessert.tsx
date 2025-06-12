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
} from "@heroui/react";
import { FC, useEffect, useState } from "react";
import { BiImage, BiMoney, BiRename } from "react-icons/bi";
import { Desserts } from "../../type";
import {
  createDessertRequest,
  editDessertRequest,
} from "../../services/desserts";
import { toast } from "sonner";

interface Props {
  id?: string;
  name?: string;
  imagen?: string;
  setDesserts: React.Dispatch<React.SetStateAction<Desserts[] | null>>;

  isOpen: boolean;
  onClose: () => void;
}

const ModalAddDessert: FC<Props> = ({
  isOpen,
  onClose,
  setDesserts,
  id,
  name,
  imagen,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("./Logo.png");

  useEffect(() => {
    if (id) {
      setImageUrl(imagen || "./Logo.png");
    }
    return () => {
      setImageUrl("./Logo.png");
    };
  }, [id, imagen]);

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const inputImage = data["image"] as string;
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
      editDessertRequest(id, {
        imagen: inputImage,
        price: parseInt(inputPrice),
        name: inputName,
      })
        .then((res) => {
          setDesserts((prev) => {
            if (!prev) {
              return null;
            }
            const dessert = res.data.data;

            const dessertFilter = prev.filter((prevDessert) => {
              return prevDessert.id !== id;
            });
            return [dessert, ...dessertFilter];
          });
          toast.success("Postre editado con exito");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al editar el postre");
        })
        .finally(() => {
          setLoading(false);
          onClose();
        });
    }

    if (!id) {
      createDessertRequest({
        imagen: inputImage,
        price: parseInt(inputPrice),
        name: inputName,
      })
        .then((res) => {
          setDesserts((prev) => {
            return prev ? [res.data.data, ...prev] : null;
          });
          toast.success("Postre creado con exito");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al crear el postre");
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
                {!id && <h1 className="text-2xl font-bold">Agregar Postre</h1>}
                {id && <h1 className="text-2xl font-bold">Editar Postre</h1>}
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col items-center w-full gap-4">
                      <img
                        className="size-56 bg-transparent rounded-full"
                        src={imageUrl}
                        alt="Imagen de Usuario"
                      />
                      <Input
                        autoFocus
                        name="image"
                        endContent={
                          <BiImage className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Url Imagen"
                        placeholder="https://image.example"
                        variant="bordered"
                        labelPlacement="outside"
                        onChange={handleImageUrlChange}
                      />
                    </div>
                    <div className="flex gap-4 w-full">
                      <Input
                        autoFocus
                        name="name"
                        defaultValue={name}
                        endContent={
                          <BiRename className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Description"
                        placeholder="Entra la descripcion"
                        variant="bordered"
                        labelPlacement="outside"
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
                  </div>

                  <div className="flex min-w-full justify-end mt-5 gap-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      {loading && <Spinner color="default" />}
                      {!loading && (
                        <span className=" font-semibold">Guardar</span>
                      )}
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

export default ModalAddDessert;
