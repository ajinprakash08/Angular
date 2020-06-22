export interface Product {
    payload: {
        title: string;
        price: number;
        category: string;
        url: string;
    };
    key: string;
    quantity: number;

}


export interface NewProduct {
    title: string;
    price: number;
    category: string;
    url: string;
    key: string;
    quantity: number;
}
