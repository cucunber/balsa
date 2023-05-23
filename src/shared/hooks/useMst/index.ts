import { useContext } from "react";
import { IRootStore, StoreContext } from "shared/store";

export const useMst = <Selected = unknown>(
  selector: (state: IRootStore) => Selected
) => {
  const context = useContext(StoreContext);
  if (!context) {
    throw Error("There is no store or store provider");
  }
  return selector(context);
};
