import {useContext} from 'react'

import {FaShoppingCart} from 'react-icons/fa'
import {IoLogOut} from 'react-icons/io5'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const renderCartIcon = () => (
    <Link to="/cart" className="nav-link">
      <button data-testid="cart" className="cart-icon-container" type="button">
        <FaShoppingCart className="cart-image" />
        <p className="cart-count">{cartList.length}</p>
      </button>
    </Link>
  )

  const logoutApp = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="nav-header">
      <Link to="/" className="nav-link">
        <h1 className="logo-heading">{restaurantName}</h1>
      </Link>
      <div className="cart-container">
        <p className="my-orders-text">My Orders</p>
        {renderCartIcon()}
        <IoLogOut className="cart-image" onClick={logoutApp} />
      </div>
    </header>
  )
}

export default withRouter(Header)
