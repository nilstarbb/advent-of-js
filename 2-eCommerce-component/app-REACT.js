const { useState, useEffect } = React;

const menuItems = [
  {
    name: "French Fries with Ketchup",
    price: 223,
    image: "plate__french-fries.png",
    alt: "French Fries",
    count: 0,
  },
  {
    name: "Salmon and Vegetables",
    price: 512,
    image: "plate__salmon-vegetables.png",
    alt: "Salmon and Vegetables",
    count: 0,
  },
  {
    name: "Spaghetti Meat Sauce",
    price: 782,
    image: "plate__spaghetti-meat-sauce.png",
    alt: "Spaghetti with Meat Sauce",
    count: 0,
  },
  {
    name: "Bacon, Eggs, and Toast",
    price: 599,
    image: "plate__bacon-eggs.png",
    alt: "Bacon, Eggs, and Toast",
    count: 0,
  },
  {
    name: "Chicken Salad with Parmesan",
    price: 698,
    image: "plate__chicken-salad.png",
    alt: "Chicken Salad with Parmesan",
    count: 0,
  },
  {
    name: "Fish Sticks and Fries",
    price: 634,
    image: "plate__fish-sticks-fries.png",
    alt: "Fish Sticks and Fries",
    count: 0,
  },
];

const formatPrice = (price) => "$" + (price / 100).toFixed(2);

const MenuItemButton = ({ item, addItemToCart }) => {
  if (item.count > 0) {
    return (
      <button className="in-cart">
        <img src="images/check.svg" alt="Check" />
        In Cart
      </button>
    );
  } else {
    return (
      <button className="add" onClick={() => addItemToCart(item)}>
        Add to Cart
      </button>
    );
  }
};

const MenuItem = ({ item, addItemToCart }) => {
  return (
    <li>
      <div className="plate">
        <img src={"images/" + item.image} alt={item.alt} className="plate" />
      </div>
      <div className="content">
        <p className="menu-item">{item.name}</p>
        <p className="price">{formatPrice(item.price)}</p>
        <MenuItemButton item={item} addItemToCart={addItemToCart} />
      </div>
    </li>
  );
};

const CartItem = ({ itemInCart, increaseItem, decreaseItem }) => {
  return (
    <li>
      <div className="plate">
        <img
          src={"images/" + itemInCart.image}
          alt={itemInCart.alt}
          className="plate"
        />
        <div className="quantity">{itemInCart.count}</div>
      </div>
      <div className="content">
        <p className="menu-item">{itemInCart.name}</p>
        <p className="price">{formatPrice(itemInCart.price)}</p>
      </div>
      <div className="quantity__wrapper">
        <button className="decrease" onClick={() => decreaseItem(itemInCart)}>
          <img src="images/chevron.svg" />
        </button>
        <div className="quantity">{itemInCart.count}</div>
        <button className="increase" onClick={() => increaseItem(itemInCart)}>
          <img src="images/chevron.svg" />
        </button>
      </div>
      <div className="subtotal">
        {formatPrice(itemInCart.price * itemInCart.count)}
      </div>
    </li>
  );
};

const CartSummary = ({ itemsInCart, increaseItem, decreaseItem }) => {
  if (itemsInCart.length == 0) {
    return <p className="empty">Your cart is empty.</p>;
  } else {
    return (
      <ul className="cart-summary">
        {itemsInCart.map((item) => (
          <CartItem
            itemInCart={item}
            key={item.name}
            increaseItem={increaseItem}
            decreaseItem={decreaseItem}
          />
        ))}
      </ul>
    );
  }
};

const Cart = ({ itemsInCart, increaseItem, decreaseItem }) => {
  const subtotal = itemsInCart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  return (
    <div className="panel cart">
      <h1>Your Cart</h1>
      <CartSummary
        itemsInCart={itemsInCart}
        increaseItem={increaseItem}
        decreaseItem={decreaseItem}
      />

      <div className="totals">
        <div className="line-item">
          <div className="label">Subtotal:</div>
          <div className="amount price subtotal">{formatPrice(subtotal)}</div>
        </div>
        <div className="line-item">
          <div className="label">Tax:</div>
          <div className="amount price tax">
            {formatPrice(subtotal * 0.0975)}
          </div>
        </div>
        <div className="line-item total">
          <div className="label">Total:</div>
          <div className="amount price total">
            {formatPrice(subtotal * 1.0975)}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState(menuItems);
  const itemsInCart = items.filter((item) => item.count > 0);

  const addItemToCart = (item) => {
    const updatedItem = { ...item, count: 1 };
    setItems(items.map((i) => (i.name !== item.name ? i : updatedItem)));
  };

  const increaseItem = (item) => {
    const updatedItem = { ...item, count: item.count + 1 };
    setItems(items.map((i) => (i.name !== item.name ? i : updatedItem)));
  };

  const decreaseItem = (item) => {
    const updatedItem = { ...item, count: item.count - 1 };
    setItems(items.map((i) => (i.name !== item.name ? i : updatedItem)));
  };

  return (
    <>
      <div className="panel">
        <h1>To Go Menu</h1>
        <ul className="menu">
          {items.map((item) => (
            <MenuItem
              key={item.name}
              item={item}
              addItemToCart={addItemToCart}
            />
          ))}
        </ul>
      </div>

      <Cart
        itemsInCart={itemsInCart}
        increaseItem={increaseItem}
        decreaseItem={decreaseItem}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("wrapper"));
