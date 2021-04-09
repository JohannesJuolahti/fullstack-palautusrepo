import React, { useState } from 'react'
const Display = props => <div>{props.text} {props.value} {props.percent}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const getWeightedValue = (weight, value) => {
  return weight * value
}

const Header = (props) => {
  return (
    <div>
        <h1>{props.header}</h1>
    </div>
  )
}

const App = () => {
  
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all_points = good + bad + neutral
  const average = ((getWeightedValue(1, good) 
  + getWeightedValue(0, neutral) 
  + getWeightedValue(-1, bad))) / all_points || 0
  const positive = (getWeightedValue(1, good) / all_points) * 100 || 0


  const header_text = "give feedback"
  const stats = "statistics"
  const good_text = "good"
  const neutral_text = "neutral"
  const bad_text = "bad"  
  const all_text = "all"
  const average_text = "average"
  const positive_text = "positive"
  const percent = "%"


  return (
    <div>
      <Header header={header_text} />
      <Button handleClick={() => setGood(good + 1)} text={good_text} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={neutral_text} />
      <Button handleClick={() => setBad(bad + 1)} text={bad_text} />
      <Header header={stats} />
      <Display text={good_text} value={good} />
      <Display text={neutral_text} value={neutral} />
      <Display text={bad_text} value={bad} />
      <Display text={all_text} value={all_points} />
      <Display text={average_text} value={average} />
      <Display text={positive_text} value={positive} percent={percent} />
    </div>
  )
}

export default App