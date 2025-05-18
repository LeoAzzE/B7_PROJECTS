"use client";
import { useCart } from "@/stores/cart";
import { Button } from "../ui/button";
import { useProducts } from "@/stores/products";
import { useEffect, useState } from "react";
import CartProduct from "./cart-product";
import { decimalToMoney } from "@/lib/utils";
import { useAuth } from "@/stores/auth";

export const CartList = () => {
  const auth = useAuth();
  const cart = useCart();
  const products = useProducts();

  const [subtotal, setSubTotal] = useState(0);
  const [shippingCoast, setShippingCost] = useState(10);

  const calculateSobtotal = () => {
    let sub = 0;
    for (let item of cart.items) {
      const prod = products.products.find(
        (pitem) => pitem.id === item.productId
      );
      if (prod) sub += item.quantity * parseFloat(prod.price.toString());
    }
    setSubTotal(sub);
  };
  useEffect(calculateSobtotal, [cart]);

  return (
    <>
      <div className="flex flex-col gap-3 my-5">
        {cart.items.map((item) => (
          <CartProduct key={item.productId} data={item} />
        ))}
      </div>
      <div className="my-4">
        <div>Sub-total: {decimalToMoney(subtotal)}</div>
        <div>Frete: {decimalToMoney(shippingCoast)}</div>
        <div className="font-bold">
          Total: {decimalToMoney(subtotal + shippingCoast)}
        </div>
      </div>
      {auth.token && (
        <Button className="bg-green-700 hover:bg-green-900">
          Finalizar Compra
        </Button>
      )}
      {!auth.token && (
        <Button onClick={() => auth.setOpen(true)}>Login / Cadastro</Button>
      )}
    </>
  );
};

export default CartList;
