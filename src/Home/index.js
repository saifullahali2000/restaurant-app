import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {AiOutlineShoppingCart} from 'react-icons/ai'
import SlideBar from '../SlideBar'
import FoodDetails from '../FoodDetails'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    slideBar: [],
    activeIdCategory: '',
    apiStatusCategory: apiStatus.initial,
    cartItems: [],
  }

  componentDidMount() {
    this.getApiDetails()
  }

  addItem = details => {
    const {cartItems} = this.state
    const isAlreadyExist = cartItems.find(
      item => item.dishId === details.dishId,
    )
    console.log(isAlreadyExist)
    if (!isAlreadyExist) {
      const newDish = {...details, quantity: 1}
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, newDish],
      }))
    } else {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(item =>
          item.dishId === details.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      }))
    }
  }

  removeItem = details => {
    const {cartItems} = this.state
    if (!cartItems) return

    const isAlreadyExist = cartItems.find(
      item => item.dishId === details.dishId,
    )

    if (isAlreadyExist) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems
          .map(item =>
            item.dishId === details.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }

  getApiDetails = async () => {
    this.setState({apiStatusCategory: apiStatus.loading})
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(api)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data[0].table_menu_list.map(eachItem => ({
        menuCategory: eachItem.menu_category,
        menuCategoryId: eachItem.menu_category_id,
        categoryDishes: eachItem.category_dishes.map(eachDish => ({
          addOnCat: eachDish.addonCat,
          dishAvailability: eachDish.dish_Availability,
          dishType: eachDish.dish_Type,
          dishCurrency: eachDish.dish_currency,
          dishDescription: eachDish.dish_description,
          dishId: eachDish.dish_id,
          dishImage: eachDish.dish_image,
          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          dishCalories: eachDish.dish_calories,
        })),
      }))

      this.setState({
        slideBar: updatedData,
        activeIdCategory: updatedData[0].menuCategoryId,
        apiStatusCategory: apiStatus.success,
      })
    }
  }

  changeSlide = menuCategoryId => {
    this.setState({
      activeIdCategory: menuCategoryId,
    })
  }

  getFilteredList = () => {
    const {activeIdCategory, slideBar, cartItems} = this.state
    const fil = slideBar.find(
      eachDish => eachDish.menuCategoryId === activeIdCategory,
    )
    return (
      <ul>
        {fil.categoryDishes.map(eachDish => (
          <FoodDetails
            details={eachDish}
            key={eachDish.dishId}
            addItem={this.addItem}
            removeItem={this.removeItem}
            cartItems={cartItems}
          />
        ))}
      </ul>
    )
  }

  loaderView = () => (
    <div className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderView = () => {
    const {apiStatusCategory} = this.state
    switch (apiStatusCategory) {
      case apiStatus.success:
        return this.getFilteredList()
      case apiStatus.loading:
        return this.loaderView()
      default:
        return ''
    }
  }

  getCartQuantity = () => {
    const {cartItems} = this.state
    return cartItems.reduce((cur, acc) => cur + acc.quantity, 0)
  }

  render() {
    const {slideBar, activeIdCategory} = this.state

    return (
      <div>
        <div className="navbar">
          <h1>UNI Resto Cafe</h1>
          <div className="cart-cont">
            <p className="my-order">My Orders</p>
            <div className="cart">
              <AiOutlineShoppingCart className="cart-image" />
              <p className="cart-count">{this.getCartQuantity()}</p>
            </div>
          </div>
        </div>
        <ul className="slide-lists">
          {slideBar.map(eachItem => (
            <SlideBar
              slideList={eachItem}
              key={eachItem.menuCategoryId}
              changeSlide={this.changeSlide}
              isActive={activeIdCategory === eachItem.menuCategoryId}
            />
          ))}
        </ul>
        {this.renderView()}
      </div>
    )
  }
}

export default Home
