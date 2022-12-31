import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { cartClose } from "../context/ShoppingCart";
import Stack from "react-bootstrap/Stack";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

export const ShoppingCart = () => {
  const cartState = useSelector((state: RootState) => state.cart.isOpen);
  const cartItems = useSelector((state: RootState) => state.counter.cartItems);

  const dispatch = useDispatch();

  return (
    <>
      <Offcanvas
        show={cartState}
        placement="end"
        onHide={() => {
          dispatch(cartClose());
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Info</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
            <div className="ms-auto fw-bold fs-5">
              Total:{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
