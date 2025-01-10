import { useEffect, useState } from "react";
import { Gallery } from "../type";
import { getGalleryRequest } from "../services/gallery";


function useGallery() {
  const [gallery, setGallery] = useState<Gallery[] | null>([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getGalleryRequest()
      .then((res) => {
        setGallery(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocurrio un error con la peticion."]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { gallery, error, loading, setGallery };
}

export default useGallery;
