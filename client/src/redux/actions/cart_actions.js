export function addToCart(obj) {
    return {
        type: "ADD_TO_CART",
        payload: obj
    };
}

export function delFromCart(obj) {
    return {
        type: "DEL_FROM_CART",
        payload: obj
    };
}

export function buy(){
    return {
        type: "BUY",
        payload: []
    };
}