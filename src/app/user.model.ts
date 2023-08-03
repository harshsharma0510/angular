export interface User {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    customer_id: number;
    customer_name: string;
    role_id: number;
    role_name: string;
    role: string;
    created_at: Date;
    modified_on: Date;
  }
  
  export interface Customer {
    id: number;
    name: string;
    website: string;
    address: string;
  }
  
  export interface Role {
    id: number;
    name: string;
    key: string;
    description: string;
  }