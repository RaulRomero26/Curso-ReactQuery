import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productActions } from "..";

export const useProductMutation = () => {

    const queryClient = useQueryClient();
  
    const mutation = useMutation({
        mutationFn: productActions.creareProduct,
        onMutate: (product) => {
            console.log('Mutando optimistic update')
            //se crea el producto optimista
            const optimisticProduct = {id: Math.random(), ...product}
            //afectar el cache
            queryClient.setQueryData(//aqui se pondria el tipado pero me da error
                ["products", { "filterKey": product.category }],
                (old) =>{
                    if(!old) return [optimisticProduct]

                    return [old, ...optimisticProduct]
                }
              );

            return {
                optimisticProduct
            }
        },
        onSuccess: (product, variables, context) => {
            // queryClient.invalidateQueries(
            //     ["products",{"filterKey":data.category}]
            // )

            queryClient.removeQueries(
                ["product",context?.optimisticProduct.id]
            );
            queryClient.setQueryData(//aqui se pondria el tipado pero me da error
                ["products", { "filterKey": product.category }],
                (old) => {
                    if(!old) return[product];

                    return old.map(cacheProduct => {
                        return cacheProduct.id === context?.optimisticProduct.id ? product : cacheProduct;
                    })
                }
              );

        },

        onError: (error, variables, context ) => {
            queryClient.removeQueries(
                ["product",context?.optimisticProduct.id]
            );

            queryClient.setQueryData(//aqui se pondria el tipado pero me da error
            ["products", { "filterKey": variables.category }],
            (old) => {
                if(!old) return[];

                return old.filter(cacheProduct => {
                    return cacheProduct.id !== context?.optimisticProduct.id 
                })
            }
          );
        }
      })
  
  
  
    return mutation;
}
