import { useEffect, useRef } from "react";
import { useMst } from "shared/hooks/useMst";
import { GenreService } from "../services";
import { instance } from "shared/constants/api/instance";
import { Genre } from "../model";

export const useGetGlobalGenres = () => {
  const store = useMst((state) => state);
  const genresService = useRef(new GenreService(instance));

  useEffect(() => {
    const getGenres = async () => {
      const [errorState, data] = await genresService.current.getGenres();
      if (!errorState) {
        store.updateGenres(data.map((dto) => Genre.create(dto)));
      }
    };
    getGenres();
  }, [store]);
};
