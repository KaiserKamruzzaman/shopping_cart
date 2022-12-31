import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { cartClose } from "../context/ShoppingCart";

export const ShoppingCart = () => {
  const cartState = useSelector((state: RootState) => state.cart.isOpen);
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
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
