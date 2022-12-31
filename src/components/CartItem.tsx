import { Button, Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../context/shoppingCartCounter";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export const CartItem = ({ id, quantity }: CartItemProps) => {
  const dispatch = useDispatch();
  const item = storeItems.find((item) => item.id == id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".70rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".80rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div className="text-muted" style={{ fontSize: ".80rem" }}>
        {formatCurrency(item.price * quantity)}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => dispatch(removeItemFromCart(id))}
      >
        &times;
      </Button>
    </Stack>
  );
};
