import { useMutation } from "@tanstack/react-query";
import { productActions } from "..";

export const useProductMutation = () => {
  
    const mutation = useMutation({
        mutationFn: productActions.creareProduct,
        onSuccess: () => {
            console.log('Producto Creado')
        },
        onSettled: () => {
            console.log('on settle')
        }
      })
  
  
  
    return mutation;
}
