import './index.css'

const SlideBar = props => {
  const {slideList, changeSlide} = props
  const {menuCategoryId, menuCategory} = slideList
  const onClickChange = () => {
    changeSlide(menuCategoryId)
  }

  return (
    <li>
      <button type="button" className="slide-button" onClick={onClickChange}>
        {menuCategory}
      </button>
    </li>
  )
}

export default SlideBar
