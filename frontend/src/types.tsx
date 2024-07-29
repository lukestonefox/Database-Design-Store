//file for any types that need to be created
export interface Product {
    productid: number,
    productname: string,
    price: number,
    producttype: string,
    brand: string,
    productsize?: string,
    description: string
};

export interface Customer {
    customerid: number,
    name: string,
    password: string,
    primaryaddress: string,
    secondaryaddress: string,
    balance: number,
    creditid1: number,
    creditid2: number
};

export interface WarehouseRow {
    warehouseid: number;
    address: string;
    capacity: number;
};
