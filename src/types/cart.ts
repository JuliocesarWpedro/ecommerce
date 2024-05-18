import { ProductDataType } from './productsFetchResponse';

export interface CartValue extends ProductDataType {
  quantity: number;
}
