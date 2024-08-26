import { useAppDispatch } from "../../hooks";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

type Props = {
  id: number;
};

function DeleteItem({ id }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(id))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
