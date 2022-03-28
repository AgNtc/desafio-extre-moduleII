import React, { ReactNode } from "react";
import { IconBaseProps } from "react-icons";

export interface GetFood {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

// export interface FoodsProviderProps {
//   children: ReactNode;
// }

export interface HeaderProps {
  onHandleOpenModal: () => void;
}

export interface InputProps {
  name: string;
  placeholder?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  children: ReactNode;
}

export type CreateFood = Omit <GetFood, 'id'>

export interface FoodsContextData {
  foods: GetFood[];
  createFood: (transaction: CreateFood) => Promise<void>;
}

export interface AddFood {
  image: string;
  name: string;
  price: string;
  description: string;
}

export type ModalAddFoodProps = {
  isOpen: boolean;
  handleAddFood: (data: AddFood) => void;
  setIsOpen: () => void;
};