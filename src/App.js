import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = cartItemId => {
    const {cartList} = this.state

    const filteredCartItems = cartList.filter(
      eachItem => eachItem.id !== cartItemId,
    )

    this.setState({cartList: filteredCartItems})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const found = cartList.find(eachProduct => eachProduct.id === product.id)

    if (found === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === found.id) {
            const updatedQuantity = eachCartItem.quantity + found.quantity
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    }
  }

  incrementCartItemQuantity = cartItemId => {
    const {cartList} = this.state

    const increasedUpdatedQuantity = cartList.map(eachItem => {
      if (eachItem.id === cartItemId) {
        const increasedQuantity = {...eachItem, quantity: eachItem.quantity + 1}
        return increasedQuantity
      }
      return eachItem
    })

    this.setState({cartList: increasedUpdatedQuantity})
  }

  decrementCartItemQuantity = cartItemId => {
    const {cartList} = this.state

    const cartItemObject = cartList.find(eachItem => eachItem.id === cartItemId)

    if (cartItemObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === cartItemId) {
            const decreasedUpdatedQuantity = {
              ...eachCartItem,
              quantity: eachCartItem.quantity - 1,
            }
            return decreasedUpdatedQuantity
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(cartItemId)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
