import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { data } from "react-router-dom";

const Checkout = () => {
  const { dishes, cartItem, addToCart, removeCartItem, getTotalCartAmount } = useContext(StoreContext);
  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "", payment: "card", promo: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const randomOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const token = localStorage.getItem('token'); // our needs auth
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post(`http://localhost:5000/api/orders`, {
        orderId: randomOrderId,
        ...form,
        items: Object.entries(cartItem).map(([id, qty]) => {
          const dish = dishes.find(d => d._id === id);
          return {
            _id: id,
            name: dish?.name,
            quantity: qty,
            price: dish?.price,
            imageUrl: dish?.imageUrl
          };
        }),
        amount: getTotalCartAmount(),
        user: user?._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // send token in header
        }
      });

      if (res.data.success) {
        toast.success("order placed successfully");
        setForm({ name: "", address: "", phone: "", email: "", payment: "card", promo: "" });

      }
      else {
        toast.error(res.data.message || "failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    }
  }
  return (
    <Wrapper>
      {/* --- LEFT PANEL: SUMMARY --- */}
      <Summary>
        <h2>Your Order</h2>
        {Object.entries(cartItem).map(([id, qty]) => {
          const dish = dishes.find((d) => d._id == id);
          if (!dish) return null;
          return (
            <CartRow key={id}>
              <img src={`http://localhost:5000${dish.imageUrl}`} alt={dish.name} />
              <div>
                <strong>{dish.name}</strong>
                <QtyControls>
                  <button onClick={() => removeCartItem(id)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => addToCart(id)}>+</button>
                </QtyControls>
              </div>
              <span>${(dish.price * qty).toFixed(2)}</span>
            </CartRow>
          );
        })}
        <Total>${getTotalCartAmount().toFixed(2)}</Total>
      </Summary>

      {/* --- RIGHT PANEL: FORM --- */}
      <Form onSubmit={handleSubmit}>
        <h2>Delivery & Payment</h2>
        <Input name="name" value={form.name} onChange={onChange} placeholder="Full Name" required />
        <Input name="address" value={form.address} onChange={onChange} placeholder="Delivery Address" required />
        <Input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="Phone Number" required />
        <Input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email id" />
        <Select name="payment" value={form.payment} onChange={onChange} required>
          <option value="card">Credit / Debit Card</option>
          <option value="cod">Cash on Delivery</option>
        </Select>

        <Input name="promo" value={form.promo} onChange={onChange} placeholder="Promo Code" />

        <Button type="submit">Place Order</Button>
      </Form>
    </Wrapper>
  );
};

export default Checkout;
const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  @media (max-width: 768px) { flex-direction: column; }
`;

const Summary = styled.div`
  flex: 2;
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
`;

const CartRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  img { width: 60px; height: 60px; border-radius: 6px; object-fit: cover; }
  div { flex: 1; margin-left: 1rem; }
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  button { width: 24px; height: 24px; }
  span { margin: 0 0.5rem; }
`;

const Total = styled.h3`
  margin-top: 1rem;
  text-align: right;
`;

const Form = styled.form`
  flex: 1;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 1rem;
  background: #ff4500;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
