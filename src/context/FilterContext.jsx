import React from "react";
import { filterReducer } from "../reducers";

//Initial state for the FilterContext
const filterInitialState = {
    productsList : [],
    onlyInStock : false,
    bestSellerOnly : false,
    sortBy : null,
    ratings: null
}

//CreateContext & pass initial state
export const FilterContext = React.createContext(filterInitialState);

//FilterProvider component to provide context to its children
export const FilterProvider = ({children}) => {

  const [state,dispatch] = React.useReducer(filterReducer, filterInitialState);
  
  function setInitialProductsList(products){
    dispatch({
      type : "SET_INITIAL_PRODUCTS_LIST",
      payload:{
        products : products
      }
    })
  }

  function bestSeller(productsList){
    return state.bestSellerOnly ? productsList.filter(product => product.best_seller == true) : productsList;
  }

  function onlyInStock(productsList){
    return state.onlyInStock ? productsList.filter(product => product.in_stock == true) : productsList;
  }
  
  function ratings(productsList){
    if(state.ratings === "4STAR&ABOVE"){
      return productsList.filter(product => product.rating >= 4);
    }
    if(state.ratings === "3STAR&ABOVE"){
      return productsList.filter(product => product.rating >= 3);
    }
    if(state.ratings === "2STAR&ABOVE"){
      return productsList.filter(product => product.rating >= 2);
    }
    if(state.ratings === "1STAR&ABOVE"){
      return productsList.filter(product => product.rating >= 1);
    }
    return productsList;
  }
  
  function sortBy(productsList){
    if(state.sortBy === "PRICE_LOW_TO_HIGH"){
      return productsList.sort((a,b) => Number(a.price) - Number(b.price))
    }
    if(state.sortBy === "PRICE_HIGH_TO_LOW"){
      return productsList.sort((a,b) => Number(b.price) - Number(a.price))
    }
    return productsList;
  }

  
  const filteredProductsList = sortBy(ratings(onlyInStock(bestSeller(state.productsList))));

  const value = {
    state,
    dispatch,
    productsList : filteredProductsList,
    setInitialProductsList,
  }

  return (
    <FilterContext.Provider value={value}>
        {children}
    </FilterContext.Provider>
  )
}

