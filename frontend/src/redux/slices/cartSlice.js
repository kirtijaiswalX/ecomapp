import {createSlice} from "@reduxjs/toolkit";
import cartAPI from "../../mocks/cart";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
       cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
        shippingAddress: {},
        paymentMethod:{},
    },
    reducers : {
        setCartItems(state,action){
            state.cartItems = action.payload;
            console.log(state.cartItems)
            localStoragesetItems("cartItems",JSON.stringify(action.payload));
        },
        removeCartItem(state,action){
            const id = action.payload;
            state.cartItems = state.cartItems.filter((x) => x._id!==id);
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        setShippingAddress(state,action){
            state.ShippingAddress = action.payload;
            localStorage.setItems("shippingAddress",JSON.stringify(action.payload));
        },
        setPaymentMethod(state,action){
            state.PaymentMethod= action.payload;
            localStorage.setItems("paymentMethod",JSON.stringify(action.payload));
        },
        
 }
});

export const{
    setCartItems,
    removeCartItem,
    setShippingAddress,
    setPaymentMethod,
} = cartSlice.actions;

export const addToCart = (id,qty)=> async(dispatch,getState)=>{
    try{
        const {cartItems} = getState().cart;
        const product = await cartAPI.fetchProduct(id);
       
        let existingItemIndex = -1;
        for(let i = 0; i < cartItems.length; i ++){
            if(cartItems[i]._id===id){
                existingItemIndex = i;
                break;
            }
        }
         if (existingItemIndex !== -1){
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].qty += qty;
            dispatch(SetCartItems(updatedCartItems));
         }else{
            dispatch(setCartItems([...cartItems,{...product,qty}]));
         }

    }catch(error){
        console.log("Error adding item to cart:", error);
    }
};
export const removeFromCart = (id)=> async(dispatch,getState)=>{
    try{
        dispatch(removeCartItem(id));
        
    }  catch (error){
        console.log("Error removing item from cart:", error);

    }
};
export const saveShippingAddress = (data)=> (dispatch)=>{
        dispatch(setShippingAddress(data));

};
export const savePaymentMethod = (data)=> (dispatch)=>{
        dispatch( setPaymentMethod(data));

};

export const {reducer} = cartSlice;
export default cartSlice;
