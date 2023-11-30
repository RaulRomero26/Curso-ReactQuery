import { ProductList } from ".."
import { useProducts } from '../hooks/useProducts';

export const WomensPage = () => {
  
  const {isLoading,products} = useProducts({
    filterKey: "women%27s%20clothing"
  })

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>
     
      { isLoading && <p>Cargando..</p>}

      <ProductList products={products}/>

    </div>
  )
}