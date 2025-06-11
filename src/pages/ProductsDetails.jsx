import { useParams } from "react-router-dom";
import { Rating } from '../components/Elements/Rating.jsx';
import React from "react";
import { useTitle } from "../hooks/useTitle.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { getProductDetail } from "../services/productService.jsx";
import { toast } from "react-toastify";

export const ProductsDetails = () => {
    
    var { id } = useParams();
    const [productDetail,setProductDetail] = React.useState({});
    useTitle({title: productDetail.name ? productDetail.name : 'Product Details'});
    const { cartList,addToCart,removeFromCart } = React.useContext(CartContext);
    const [ isInCart,setIsInCart ] = React.useState(false);
  
    React.useEffect(() => {
        async function fetchProductDetails(){
            try{
                // const response = await fetch(`http://localhost:8000/products?id=${id}`)
                // const data = await response.json();
                // if(response.ok){
                //     setProductDetail(data[0]);
                // }
                // else{
                //     console.error("Failed to fetch product details");
                // }
                const data = await getProductDetail(id); 
                setProductDetail(data[0]);


            }
            catch(error){
                 toast.error(error.message, {
                          autoClose: 5000,
                          closeButton: true,
                        })
            }
        }
        fetchProductDetails();
    },[id]);

     React.useEffect(() => {
          
            const isProductInCart = cartList.find(item => item.id === productDetail.id);
    
            if(isProductInCart){
                setIsInCart(true);
            }
            else{
                setIsInCart(false);
            }
    
    
        },[cartList,productDetail.id]);


    return (
        <main>
            <section>
                <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{productDetail.name}</h1>
                <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{productDetail.overview}</p>
                <div className="flex flex-wrap justify-around">
                    <div className="max-w-xl my-3">
                        <img className="rounded" src={productDetail.poster} alt={productDetail.name} />
                    </div>
                    <div className="max-w-xl my-3">
                        <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                            <span className="mr-1">$</span>
                            <span className="">{productDetail.price}</span>
                        </p>
                        <p className="my-3">
                            <span>
                               <Rating rating={productDetail.rating} />
                            </span>
                        </p>
                        <p className="my-4 select-none">
                            {
                                productDetail.best_seller && <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">BEST SELLER</span>
                            }
                            {
                                productDetail.in_stock ? ( <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">INSTOCK</span>)
                                : ( <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span> )
                            }
                           
                            {/* <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span> */}
                            <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">{productDetail.size} MB</span>
                        </p>
                        <p className="my-3">
                            
                            {/* <button className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}  disabled={ product.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button> */}
                            {
                                !isInCart ? <button onClick={()=>{addToCart(productDetail)}} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${productDetail.in_stock ? "" : "cursor-not-allowed"}`}  disabled={ productDetail.in_stock ? "" : "disabled" }>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>
                                : <button  onClick={()=>{removeFromCart(productDetail)}} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 ${productDetail.in_stock ? "" : "cursor-not-allowed"}`}  disabled={ productDetail.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button>
                            }
                        
                        </p>
                        <p className="text-lg text-gray-900 dark:text-slate-200">
                            {productDetail.long_description}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}