import axios from 'axios';

class CartAPI{
    async fetchProduct(productId){
        try{
            const{data} = await axios.get(`/api/products/${productId}`);
            return data;

        }catch (error){
            throw error;
        }
    }
}

const CartAPI = new CartAPI();
export default CartAPI;