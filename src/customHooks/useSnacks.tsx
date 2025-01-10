import { useEffect, useState } from "react";
import { Snacks } from "../type";
import { getSnacksRequest } from "../services/snacks";

function useSnacks() {
  const [snacks, setSnacks] = useState<Snacks[] | null>([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSnacksRequest()
      .then((res) => {
        setSnacks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocurrio un error con la peticion."]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { snacks, error, loading, setSnacks };
}

export default useSnacks;
