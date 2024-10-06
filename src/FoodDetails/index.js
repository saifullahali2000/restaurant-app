import './index.css'

const FoodDetails = props => {
  const {details, addItem, removeItem, cartItems} = props

  const {
    addOnCat,
    dishAvailability,
    dishType,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    dishCalories,
    dishId,
  } = details

  const foodType =
    dishType === 1 ? (
      <img
        src="https://tse3.mm.bing.net/th?id=OIP.-N4FwGOT_7-Lybh_3WZz8gAAAA&pid=Api&P=0&h=180"
        alt=""
        className="veg-or-non-tag"
      />
    ) : (
      <img
        src="https://tse4.mm.bing.net/th?id=OIP.mRFfW1_PKeQhfj3mu1-SywAAAA&pid=Api&P=0&h=180"
        alt=""
        className="veg-or-non-tag"
      />
    )

  const DecreaseCount = () => {
    removeItem(details)
  }

  const increaseCount = () => {
    addItem(details)
  }

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <li className="list-item">
      <div className="dish">
        {foodType}
        <div className="dish-details">
          <h1>{dishName}</h1>
          <div className="dish-currency">
            <p>{dishCurrency}</p>
            <p>{dishPrice}</p>
          </div>
          <p>{dishDescription}</p>
          {dishAvailability === true ? (
            <div className="quantity-button">
              <button
                type="button"
                className="quan-button"
                onClick={DecreaseCount}
              >
                -
              </button>
              <p>{getQuantity()}</p>
              <button
                type="button"
                className="quan-button"
                onClick={increaseCount}
              >
                +
              </button>
            </div>
          ) : (
            <p>Not available</p>
          )}
          {addOnCat.length > 0 ? (
            <p className="custom">Customizations available</p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="calorie-cont">
        <p>{dishCalories} calories</p>
      </div>
      <div className="image-cont">
        <img src={dishImage} alt="" className="dish-image" />
      </div>
    </li>
  )
}

export default FoodDetails
