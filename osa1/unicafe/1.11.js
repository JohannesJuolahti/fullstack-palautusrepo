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

const Statistics = (props) => {
    if (props.all > 0) {
        return (
            <div>
              <Display text={props.statistics.good_text} value={props.good} />
              <Display text={props.statistics.neutral_text} value={props.neutral} />
              <Display text={props.statistics.bad_text} value={props.bad} />
              <Display text={props.statistics.all_text} value={props.all} />
              <Display text={props.statistics.average_text} value={props.statistics.average} />
              <Display text={props.statistics.positive_text} value={props.statistics.positive} percent={props.statistics.percent} />
            </div>
            )
    } else {
        return (
            <div>
                <Display text={"No feedback given"} />
            </div>
        )
    }
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
  const header_text = "give feedback"
  const all_points = good + bad + neutral
  const weight_good = 1
  const weight_neutral = 0
  const weight_bad = -1

  const statistics = {
  average: ((getWeightedValue(weight_good, good)
  + getWeightedValue(weight_neutral, neutral)
  + getWeightedValue(weight_bad, bad))) / all_points || 0,
  positive: (getWeightedValue(1, good) / all_points) * 100 || 0,
  stats: "statistics",
  good_text: "good",
  neutral_text: "neutral",
  bad_text: "bad",
  all_text: "all",
  average_text: "average",
  positive_text: "positive",
  percent: "%",
  }

  return (
    <div>
      <Header header={header_text} />
      <Button handleClick={() => setGood(good + 1)} text={statistics.good_text} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={statistics.neutral_text} />
      <Button handleClick={() => setBad(bad + 1)} text={statistics.bad_text} />
      <Header header={statistics.stats} />
      <Statistics statistics={statistics} good={good} bad={bad} neutral={neutral} all={all_points}/>
    </div>
  )
}

export default App