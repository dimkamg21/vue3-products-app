export const getPriceWithDiscount = (fullPrice, discount) => {
  return discount 
    ? Math.ceil(fullPrice * (100 - discount) / 100)
    : fullPrice;
};