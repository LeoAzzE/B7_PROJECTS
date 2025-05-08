"use client";
import { Product } from "@/generated/prisma";

type Props = {
  pizzas: Product[];
};

export const PizzaList = ({ pizzas }: Props) => {
  return <div>Total: {pizzas.length}</div>;
};
