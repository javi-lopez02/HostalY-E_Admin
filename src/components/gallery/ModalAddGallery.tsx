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
import { BiImage, BiRename } from "react-icons/bi";
import { Gallery } from "../../type";
import {
  createGalleryRequest,
  editGalleryRequest,
} from "../../services/gallery";
import { toast } from "sonner";

interface Props {
  id?: string;
  imagen?: string;
  description?: string;
  setGallery: React.Dispatch<React.SetStateAction<Gallery[] | null>>;
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddGallery: FC<Props> = ({
  isOpen,
  onClose,
  id,
  imagen,
  description,
  setGallery,
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

    // Validaciones
    if (!inputName) {
      toast.error("La descripcion es requerida");
      setLoading(false);
      return;
    }
    if (!inputImage) {
      toast.error("La imagen es requerido.");
      setLoading(false);
      return;
    }
    if (id) {
      editGalleryRequest(id, {
        imagen: inputImage,
        description: inputName,
      })
        .then((res) => {
          setGallery((prev) => {
            if (!prev) {
              return null;
            }
            const gallery = res.data.data;

            const galleryFilter = prev.filter((prevGallery) => {
              return prevGallery.id !== id;
            });
            return [gallery, ...galleryFilter];
          });
          toast.success("Imagen editada con exito");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al editar la Imagen");
        })
        .finally(() => {
          setLoading(false);
          onClose();
        });
    }

    if (!id) {
      createGalleryRequest({
        imagen: inputImage,
        description: inputName,
      })
        .then((res) => {
          setGallery((prev) => {
            return prev ? [res.data.data, ...prev] : null;
          });
          toast.success("Imagen creada con exito");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al crear la Imagen");
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
                {!id && <h1 className="text-2xl font-bold">Agregar Imagen</h1>}
                {id && <h1 className="text-2xl font-bold">Editar Imagen</h1>}
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center w-full gap-4">
                    <img
                      className="size-56 bg-transparent"
                      src={imageUrl}
                      alt="Imagen de Bebida"
                    />
                    <Input
                      autoFocus
                      onChange={handleImageUrlChange}
                      name="image"
                      endContent={
                        <BiImage className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Url Imagen"
                      placeholder="https://image.example"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      autoFocus
                      name="name"
                      endContent={
                        <BiRename className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Description"
                      placeholder="Entra la descripcion"
                      defaultValue={description}
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

export default ModalAddGallery;
