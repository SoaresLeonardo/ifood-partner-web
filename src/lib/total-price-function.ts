export function totalPriceFn(totalPrice: number) {
  const price = totalPrice / 100;

  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
