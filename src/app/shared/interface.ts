export interface IClient{
    id:number;
    first_name:string;
    last_name:string;
    address:string;
    city:string;
    state:string;
    country:string;
    phone:number;
    email:string
  }

  export interface IProducts{
    id: number;
    name: string;
    price: number;
    sku: string;
    stock: number;
  }
  export interface Ifile{
    SkippedClients:number;
    ImportedClients:number
  }