import AddProduct from "./AddProduct";
import AllProduct from "./AllProduct";
import Orders from "./Orders";
import { Dispatch, SetStateAction } from "react";

export default function Main(props: {
  panel: number;
  setPanel: Dispatch<SetStateAction<number>>;
}) {
  const { panel, setPanel } = props;

  if (panel === 0) {
    return <Orders />;
  } else if (panel === 1) {
    return <AddProduct panel={panel} setPanel={setPanel} />;
  } else {
    return <AllProduct setPanel={setPanel} />;
  }
}
