import React, { useState } from 'react'
const Display = props => <div>{props.text} {props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

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
  
  const header_text = "give feedback"
  const stats = "statistics"
  const good_text = "good"
  const neutral_text = "neutral"
  const bad_text = "bad"  

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
    </div>
  )
}

export default App