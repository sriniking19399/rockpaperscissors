import './index.css'

const ChoiceItem = props => {
  const {listItem, getSelectChoice} = props
  const {id, imageUrl} = listItem
  const onClickButton = () => {
    getSelectChoice(id)
  }
  return (
    <li className="choice-item">
      <button
        data-testid={`${id.toLowerCase(id)}Button`}
        type="button"
        className="choice-button"
        onClick={onClickButton}
      >
        <img alt={id} className="choice-image" src={imageUrl} />
      </button>
    </li>
  )
}
export default ChoiceItem
