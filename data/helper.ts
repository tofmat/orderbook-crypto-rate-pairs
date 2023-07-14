import { Order } from "./model";

// Helper function to calculate the price
export const calculatePrice = (order: Order, group: number): string => {
  const price =
    Number(order.order.takerAmount) / Number(order.order.makerAmount);
  const newPrice = price / group;
  return newPrice.toFixed(2); // Adjust decimal places as needed
};

// Helper function to calculate the total
export const calculateTotal = (order: Order, group: number): string => {
  const price =
    Number(order.order.takerAmount) / Number(order.order.makerAmount);
  const total = price * Number(order.order.makerAmount);
  const newTotal = total / group;
  return newTotal.toFixed(2); // Adjust decimal places as needed
};

// Helper function to calculate the price
export const calculateBidPrice = (order: Order, group: number): string => {
  const price =
    Number(order.order.makerAmount) / Number(order.order.takerAmount);
  const newPrice = price / group;
  return newPrice.toFixed(2); // Adjust decimal places as needed
};

// Helper function to calculate the total
export const calculateBidTotal = (order: Order, group: number): string => {
  const price =
    Number(order.order.makerAmount) / Number(order.order.takerAmount);
  const total = price * Number(order.order.takerAmount);
  const newTotal = total / group;
  return newTotal.toFixed(2); // Adjust decimal places as needed
};
