import { useEffect, useState } from 'react'

export const useFetchProducts = (page=0) => {
    const [products, setProducts] = useState([]);
    const [hasMorePage, setHasMorePage] = useState(false);

    useEffect(()=>{
        const fetchProducts = async () => {
            const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10}`);
            const data = await res.json();
            if(data.products.length===0)
            {
                return setHasMorePage(false)
            }

            setProducts(prev=>[...prev,...data.products]);
            setHasMorePage(true);

        }
        fetchProducts();
    },[page])

  return {products, hasMorePage};
}
