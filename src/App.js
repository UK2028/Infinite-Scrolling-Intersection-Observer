import { useState, useRef, useEffect } from 'react';

import './App.css';
import { ProductsCard } from './components/ProductsCard';
import { useFetchProducts } from './hooks/useFetchProducts';

function App() {

  const [page, setPage] = useState(0);

  const lastProductRef = useRef();

  const {products, hasMorePage} = useFetchProducts(page);

  useEffect(()=>{

      const observer = new IntersectionObserver((enteries)=>{
        const last = enteries[0];
        if(last.isIntersecting && hasMorePage)
        {
          setPage(prev=>prev+1);
        }
      },{rootMargin:"-100px"})

      if(lastProductRef.current)
      {
        observer.observe(lastProductRef.current)
      }

    return () => {

      if(observer)
      {
        observer.disconnect();
      }
    }
  },[products,hasMorePage])

  const productsList = products.map((product,index)=>{
    if(products.length === index+1)
    {
      return <ProductsCard ref={lastProductRef} key={product.id} product={product}/>
    }
    return <ProductsCard key={product.id} product={product}/>
  })

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center bg-gray-800 text-white">
      <h1 className='text-2xl underline underline-offset-4 mb-10'>Infinite Scrolling With Intersection Observer</h1>
      {productsList}
      {hasMorePage && <div>Loading...</div>}
    </div>
  );
}

export default App;
