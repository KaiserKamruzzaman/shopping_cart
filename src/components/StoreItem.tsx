import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
// import { decrement, increment } from './counterSlice'
import {
  increaseCartQuantity,
  getItemQuantity,
} from "../context/shoppingCartCounter";
import { useState } from "react";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const count = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  const quantity = 0;
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {count.quantity == 0 ? (
            <Button
              className="w-100"
              onClick={() => dispatch(increaseCartQuantity(id))}
            >
              + Add to Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify_content-center"
                style={{ gap: ".5rem" }}
              >
                <Button>+</Button>
                <div>
                  <span className="fs-3">
                    {count.cartItems.map((item) => {
                      if (item.id == id) {
                        return item.quantity;
                      }
                    })}
                  </span>
                  in cart
                </div>
                <Button>-</Button>
              </div>
              <Button variant="danger" size="sm">
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};