interface OrderItemsDTO {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface OrderResponseDTO {
  orderID: number;
  userEmail?: string;
  phoneNumber: string;
  dropLocation: string;
  createdAt: string;
  orderItems: OrderItemsDTO[];
}
