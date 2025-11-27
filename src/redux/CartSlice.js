import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [], // [{ salonId, products: [ { productId, productName, price, quantity, totalPrice } ] }]
  grandTotal: 0, // 💰 total of all products
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { salonId, product } = action.payload;
      const { productId, productName, productImage, price, quantity, stock } =
        product;

      // find salon cart
      const existingSalon = state.cart.find(s => s.salonId === salonId);

      if (existingSalon) {
        const existingProduct = existingSalon.products.find(
          p => p.productId === productId,
        );

        if (existingProduct) {
          // increase/decrease quantity
          existingProduct.quantity += quantity;

          // prevent exceeding stock
          if (existingProduct.quantity > existingProduct.stock) {
            existingProduct.quantity = existingProduct.stock;
          }

          // remove if zero or below
          if (existingProduct.quantity <= 0) {
            existingSalon.products = existingSalon.products.filter(
              p => p.productId !== productId,
            );
          } else {
            existingProduct.totalPrice =
              existingProduct.price * existingProduct.quantity;
          }
        } else {
          // add new product
          existingSalon.products.push({
            productId,
            productName,
            productImage,
            price,
            quantity,
            stock,
            totalPrice: price * quantity,
          });
        }
      } else {
        // if adding from new salon -> clear previous cart and add new one
        state.cart = [
          {
            salonId,
            products: [
              {
                productId,
                productName,
                productImage,
                price,
                quantity,
                stock,
                totalPrice: price * quantity,
              },
            ],
          },
        ];
      }

      // update grand total after every change
      state.grandTotal = state.cart.reduce((sum, salon) => {
        return (
          sum + salon.products.reduce((pSum, item) => pSum + item.totalPrice, 0)
        );
      }, 0);
    },
    clearCart: state => {
      state.cart = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
