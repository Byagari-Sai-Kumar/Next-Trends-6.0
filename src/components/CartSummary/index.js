import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let total = 0
      cartList.forEach(element => {
        total += element.price * element.quantity
      })
      const noOfItems = cartList.length

      return (
        <div className="cartSummaryContainer">
          <h1 className="orderTotalHeading">
            Order Total: <span className="totalPrice">Rs {total}/- </span>
          </h1>
          <p className="totalItemsPara">{noOfItems} Items in Cart</p>
          <button type="button" className="checkoutButton">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
