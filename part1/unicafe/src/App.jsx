import { useState } from 'react'

const StatisticLine = ({ text, value }) =>
    <>
      <td>{text}</td><td>{value}</td>
    </>

const Button = ({ onClick, text}) =>
  <>
    <button onClick={onClick}>{text}</button>
  </>

const Statistics = ({ good, bad, neutral }) => {
  const total = good + neutral + bad
  if(total == 0) {
    return (
      <div>
        No feedback given yet.
      </div>
    )
  } 
  const avg = (good+(-bad))/3
  const pos = (good/total) * 100
  return(
    <div>
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={good} /></tr>
          <tr><StatisticLine text="neutral" value={neutral} /></tr>
          <tr><StatisticLine text="bad" value={bad} /></tr>
          <tr><StatisticLine text="all" value={total} /></tr>
          <tr><StatisticLine text="average" value={avg} /></tr>
          <tr><StatisticLine text="postivie" value={pos+" %"} /></tr>
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <h1>Give Feedback</h1>
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
