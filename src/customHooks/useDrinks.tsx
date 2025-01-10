import { useEffect, useState } from "react";
import { Drinks } from "../type";
import { getDrinksRequest } from "../services/drinks";

function useDrinks() {
  const [drinks, setDrinks] = useState<Drinks[] | null>([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getDrinksRequest()
      .then((res) => {
        setDrinks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocurrio un error con la peticion."]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { drinks, error, loading, setDrinks };
}

export default useDrinks;
