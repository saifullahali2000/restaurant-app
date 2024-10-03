import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import SlideBar from '../SlideBar'
import FoodDetails from '../FoodDetails'
import './index.css'

class Home extends Component {
  state = {
    slideBar: [],
    activeIdCategory: '',
  }

  componentDidMount() {
    this.getApiDetails()
  }

  getApiDetails = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(api)
    const data = await response.json()
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
    })
  }

  changeSlide = menuCategoryId => {
    this.setState({
      activeIdCategory: menuCategoryId,
    })
  }

  getFilteredList = () => {
    const {activeIdCategory, slideBar} = this.state
    return slideBar.find(
      eachDish => eachDish.menuCategoryId === activeIdCategory,
    )
  }

  render() {
    const {slideBar} = this.state
    const {categoryDishes} = this.getFilteredList()

    return (
      <div>
        <div className="navbar">
          <h1>UNI Resto Cafe</h1>
          <AiOutlineShoppingCart className="cart-image" />
        </div>
        <ul className="slide-lists">
          {slideBar.map(eachItem => (
            <SlideBar
              slideList={eachItem}
              key={eachItem.menuCategoryId}
              changeSlide={this.changeSlide}
            />
          ))}
        </ul>
        <ul>
          {categoryDishes.map(eachDish => (
            <FoodDetails details={eachDish} key={eachDish.dishId} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
