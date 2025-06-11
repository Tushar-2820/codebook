import { ProductCard } from '../../../components';
import React from 'react';
import { getFeaturedProducts } from '../../../services';
import { toast } from 'react-toastify';

export const FeaturedProducts = () => {

  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  
 

  React.useEffect(() => {
    async function fetchFeaturedProducts() {
      try{
        // const response = await fetch('http://localhost:8000/featured_products');
        // const data = await response.json();
        // if(response.ok) {
        //   setFeaturedProducts(data);
        //   // console.log('Featured products fetched successfully:', data);
        // }
        // else {
        //   console.error('Failed to fetch featured products:', data);
        // }
        const data = await getFeaturedProducts();
        setFeaturedProducts(data);

      }
      catch (error) {
         toast.error(error.message, {
                  autoClose: 5000,
                  closeButton: true,
                })
      }
    }

    fetchFeaturedProducts();
  }, []);
  


  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {/* <ProductCard /> */}
        {
          featuredProducts && featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))
        }
      </div>
    </section>
  )
}