export const addItemToCart = (cartItems, cartItemToAdd) => {
    console.log(cartItems, cartItemToAdd)
    const existingCartItem = cartItems.find(cartItem => cartItem.ItemID === cartItemToAdd.ItemID);

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.ItemID === cartItemToAdd.ItemID
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.ItemID === cartItemToRemove.ItemID);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.ItemID !== cartItemToRemove.ItemID)
    }

    return cartItems.map(
        cartItem => cartItem.ItemID === cartItemToRemove.ItemID ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}