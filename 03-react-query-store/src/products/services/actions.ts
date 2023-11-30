import { type Product, productsApi } from "..";

interface GetProductsOptions {
    filterKey?: string;
}


const sleep = (seconds : number):Promise<boolean> => {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve(true);
        },seconds * 1000);
    })
}

export const getProducts = async ({filterKey}:GetProductsOptions):Promise<Product[]> => {
    
    await sleep(2);

    const filterUrl = (filterKey) ? `category=${filterKey}` : ''

    const {data} = await productsApi.get<Product[]>(`/products?${filterUrl}`);
    return data;
}
export const getProductById = async ( id: number):Promise<Product> => {
    
    await sleep(2);

    const {data} = await productsApi.get<Product>(`/products/${id}`);
    return data;
}

export interface ProductLike {
    id?:         number;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    image:       string;
}

export const creareProduct = async( product: ProductLike) => {
    await sleep(2);

    const {data} = await productsApi.post<Product>('/products',product)
    return data;
}