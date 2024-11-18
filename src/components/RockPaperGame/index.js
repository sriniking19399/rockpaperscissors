import {Component} from 'react'
import Popup from 'reactjs-popup'
import ChoiceItem from '../ChoiceItem'

import 'reactjs-popup/dist/index.css'

import './index.css'

class RockPaperGame extends Component {
  state = {
    result: true,
    resultText: 'WIN',
    score: 0,
    selectChoices: '',
    randomChoices: '',
  }

  getSelectChoice = id => {
    const {choicesList} = this.props
    const [selectItem] = choicesList.filter(eachItem => eachItem.id === id)
    const randimItem = choicesList[Math.floor(Math.random() * 10) % 3]
    if (randimItem.id === selectItem.id) {
      this.setState({
        resultText: 'IT IS DRAW',
        result: false,
        selectChoices: selectItem,
        randomChoices: randimItem,
      })
    } else if (
      (selectItem.id === 'SCISSORS' && randimItem.id === 'PAPER') ||
      (selectItem.id === 'ROCK' && randimItem.id === 'SCISSORS') ||
      (selectItem.id === 'PAPER' && randimItem.id === 'ROCK')
    ) {
      this.setState(prevState => ({
        resultText: 'YOU WON',
        selectChoices: selectItem,
        randomChoices: randimItem,
        score: prevState.score + 1,
        result: false,
      }))
    } else {
      this.setState(prevState => ({
        resultText: 'YOU LOSE',
        score: prevState.score - 1,
        result: false,
        selectChoices: selectItem,
        randomChoices: randimItem,
      }))
    }
  }

  onClickPlayAgain = () => {
    this.setState({result: true})
  }

  render() {
    const {result, score, selectChoices, resultText, randomChoices} = this.state
    console.log(selectChoices.id, randomChoices.id)
    const {choicesList} = this.props
    return (
      <div className="bg-container">
        <div className="score-container">
          <div>
            <h1 className="heading">
              ROCK <br />
              PAPER
              <br />
              SCISSORS
            </h1>
          </div>
          <div className="result-container">
            <p className="score">Score</p>
            <p className="score">{score}</p>
          </div>
        </div>
        {result ? (
          <ul className="choices-container">
            {choicesList.map(eachItem => (
              <ChoiceItem
                getSelectChoice={this.getSelectChoice}
                key={eachItem.id}
                listItem={eachItem}
              />
            ))}
          </ul>
        ) : (
          <div className="result-display-container">
            <div className="result-image-container">
              <div className="result-you">
                <h1>YOU</h1>
                <img
                  alt="your choice"
                  className="select-image"
                  src={selectChoices.imageUrl}
                />
              </div>
              <div className="result-you">
                <h1>OPPONENT</h1>
                <img
                  alt="opponent choice"
                  className="select-image"
                  src={randomChoices.imageUrl}
                />
              </div>
            </div>
            <p>{resultText}</p>
            <button type="button" onClick={this.onClickPlayAgain}>
              PLAY AGAIN
            </button>
          </div>
        )}
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                RULES
              </button>
            }
          >
            {close => (
              <div>
                <button
                  type="button"
                  className="close-button"
                  onClick={() => close()}
                >
                  Close
                </button>
                <div className="rules-container">
                  <img
                    className="rules-image"
                    alt="rules"
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  />
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}
export default RockPaperGame
