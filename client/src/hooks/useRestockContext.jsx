import { RestocksContext } from "../context/RestockContext";
import { useContext } from "react";

export const useIRestocksContext = () => {
  const context = useContext(RestocksContext);

  if (!context) {
    throw Error(
      "useIRestocksContext must be used inside a RestockContextProvider"
    );
  }

  return context;
};
