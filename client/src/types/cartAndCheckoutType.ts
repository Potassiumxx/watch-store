export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
  category: string;
  availableStock: number;
}

export interface CheckoutItem extends Omit<CartItem, "availableStock"> {}
