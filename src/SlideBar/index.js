import './index.css'

const SlideBar = props => {
  const {slideList, changeSlide, isActive} = props
  const {menuCategoryId, menuCategory} = slideList
  const onClickChange = () => {
    changeSlide(menuCategoryId)
  }

  const botLine = isActive ? ' active-btn' : 'slide-button'

  return (
    <li>
      <button type="button" className={`${botLine}`} onClick={onClickChange}>
        {menuCategory}
      </button>
    </li>
  )
}

export default SlideBar
