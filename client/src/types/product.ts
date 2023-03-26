export type ProductSeller = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  user_id: string;
  image_name: string;
  image_path: string;
  email: string;
  mimetype: string;
  size: number;
  first_name: string;
  last_name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  user_id: string;
  image_name: string;
  image_path: string;
  mimetype: string;
  size: number;
};
