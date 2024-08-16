import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]); // apı den cekip sakladigim veriler
  const [cart, setCart] = useState([]); // sepetimdeki ürünler

  useEffect(() => {
    fetch("https://dummyjson.czaylabs.com.tr/api/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  const addToCart = (x) => {
    const productId = Number(x.id);
    const product = products.find((x) => x.id === productId);
    const basketItem = cart.find((x) => x.id === productId);
    if (basketItem) {
      setCart(
        cart.map((x) => {
          if (basketItem.id === x.id) {
            x.quantity++;
          }
          return x;
        })
      );
    } else {
      setCart([...cart, { ...x, quantity: 1 }]);
    }
  };

  function handleDeleteBtn(id) {
    setCart(cart.filter((x) => products.id !== id));
  }

  function total() {
    const total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += Number(cart[i].price) * Number(cart[i].quantity);
    }
  }

  return (
    <>
      <div className="productList">
        {products.map((x) => (
          <div className="info" key={x.id}>
            <img src={x.image.desktop} alt="" />
            <button className="addProduct" onClick={() => addToCart(x)}>
              Add To Cart
            </button>
            <p>{x.category}</p>
            <p>{x.name}</p>
            <p>${x.price}</p>
          </div>
        ))}
      </div>
      <AddToCart cart={cart} handleDeleteBtn={handleDeleteBtn} total={total} />
    </>
  );
}

function AddToCart({ cart, handleDeleteBtn, id, total }) {
  // sepetime eklenen ürünler
  return (
    <>
      <div className="basketCart">
        <h2>
          {" "}
          Your Cart (<span id="quantityTotal">0</span>)
        </h2>
        <div className="cart">
          <div className="productBasketBox">
            <div className="basket">
              {cart.map((x, i) => (
                <div className="basketBox" key={i}>
                  <h3>{x.name}</h3>
                  <div className="productBox">
                    <h4>
                      {x.quantity}x{" "}
                      <span>
                        @ ${x.price}
                        <span>${x.quantity * x.price}</span>
                      </span>
                    </h4>
                    <button
                      onClick={() => handleDeleteBtn(id)}
                      className="deleteBtn"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z"
                          fill="#AD8A85"
                        />
                        <path
                          d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z"
                          fill="#AD8A85"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="orderTotal">
          <h6>
            Order Total: <span className="salesTotal">{total}</span>
          </h6>
          <img src="assets/img/Carbon Neutral Info.png" alt="" />
        </div>
        <button id="addBtn">Confirm Order</button>
      </div>
    </>
  );
}
