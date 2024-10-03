import './index.css'

const FoodDetails = props => {
  const {details} = props

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
              <button type="button" className="quan-button">
                -
              </button>
              <p>0</p>
              <button type="button" className="quan-button">
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
        <p>{dishCalories}calories</p>
      </div>
      <div className="image-cont">
        <img src={dishImage} alt="" className="dish-image" />
      </div>
    </li>
  )
}

export default FoodDetails
