import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
export const StoreContext = createContext(null)
import { toast } from "react-toastify";
const API_URL = import.meta.env.REACT_APP_API_URL;

const StoreContextProvider = (props) => {
  const [dishes, setDishes] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const searchHotels = (locationQuery = "", nameQuery = "") =>
    hotels.filter((h) =>
      (!locationQuery || h.city.toLowerCase().includes(locationQuery.toLowerCase())) &&
      (!nameQuery ||
        h.name.toLowerCase().includes(nameQuery.toLowerCase()))
    )
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/dishes`);
        setDishes(res.data);                                            // useEffect
      }
      catch (err) {
        console.error("Failed to load dishes:", err.message);
      }
    };
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/hotels`);
        setHotels(res.data);
      }
      catch (err) {
        console.error('Failed to fetch hotels', err.message);
      }
    };
    fetchDishes();
    fetchHotels();
  }, []);
  const dishById = useMemo(() => {
    const map = new Map();
    if (Array.isArray(dishes)) {
      dishes.forEach((d) => map.set(d._id, d));
      return map;
    }
  }, [dishes]);

  const addToCart = (_id) => {
    setCartItem((prev) => {
      if (!_id) return prev;    // guard against undefined 
      const updatedCart = { ...prev };
      if (updatedCart[_id]) {
        updatedCart[_id] += 1;
      } else {
        updatedCart[_id] = 1;
      }
      return updatedCart;
    });
    toast.success('Item Added to cart');
  };
  const removeCartItem = (_id) => {
    setCartItem((prev) => {
      if (!prev[_id]) return prev;           // There is nothing to remove
      const updatedCart = { ...prev };
      if (updatedCart[_id] > 1) {
        updatedCart[_id] -= 1;
      } else {
        delete updatedCart[_id];
      }
      return updatedCart;
    });
    toast.success('Item removed from cart');
  };

  const getTotalCartAmount = () =>
    Object.entries(cartItem).reduce((sum, [_id, quantity]) => {
      const dish = dishById.get(_id);
      if (!dish) return sum;
      return sum + Number(dish.price) * quantity;
    }, 0);
  const contextValue = useMemo(() => ({
    dishes,
    setDishes,
    cartItem,
    addToCart,
    removeCartItem,
    getTotalCartAmount,
    dishById,
    hotels,
    searchHotels
  }));
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider;