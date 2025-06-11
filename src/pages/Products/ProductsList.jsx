import { ProductCard } from "../../components"
import { FilterBar } from "./components/FilterBar"
import React from "react";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { FilterContext } from '../../context';
import { getProductsList } from "../../services";
import { toast } from "react-toastify"


export const ProductsList = () => {

  const { productsList ,setInitialProductsList } = React.useContext(FilterContext);//Holds the Global State
  useTitle({title: 'All eBooks'});
  const [showFilter, setShowFilter] = React.useState(false);
  // const [productsList, setProductsList] = React.useState([]);
  const location = useLocation().search;// This will give you the query string from the URL
  const searchTerm = new URLSearchParams(location).get('q'); // Extract the 'q' parameter from the query string
  
//  console.log(initialProductsList);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  React.useEffect(() => {

   async function fetchProductsList(){
     try{
        // const response= await fetch(`http://localhost:8000/products?name_like=${ searchTerm ? searchTerm : ''}`);
        // const data = await response.json();
                // if(response.ok){
        //   setInitialProductsList(data);
        //   // setProductsList(data);
          
        // }else{
        //   console.error("Failed to fetch products list:", data);
        // }
        const data = await getProductsList(searchTerm);
        setInitialProductsList(data);
       

     }
     catch(error){
        toast.error(error.message, {
          autoClose: 5000,
          closeButton: true,
        })
     }
   }

   fetchProductsList();
  },[searchTerm])//eslint-diasble-line

  return (
    <main>
        <section className="my-5">
          <div className="my-5 flex justify-between">
            <span className="text-2xl font-semibold dark:text-slate-100 mb-5">All eBooks ({productsList.length})</span>
            <span>
              <button onClick={toggleFilter} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" type="button"> 
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
              </button>
            </span>            
          </div>    

          <div className="flex flex-wrap justify-center lg:flex-row">
           
           {
            productsList && productsList.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))
           }
            
          </div>  

          {
            showFilter && <FilterBar showFilter={showFilter} setShowFilter={setShowFilter}/>
          }

          
        </section>
      </main> 
  )
}