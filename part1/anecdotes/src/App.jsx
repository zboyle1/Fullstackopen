import { useState } from 'react'

const Button = ({ onClick, text}) =>
  <>
    <button onClick={onClick}>{text}</button>
  </>

const IndVotes = ({ numVote }) => {
  if(numVote == 1) {
    return(
      <>
        <p>has {numVote} vote</p>
      </>
    )
  }
  return(
    <>
      <p>has {numVote} votes</p>
    </>
  )
}

const Display = ({anecdote, vote}) =>
  <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdote}</p>
    <IndVotes numVote= {vote}/>
  </div>

const DisplayPop = ({anecdote, vote}) => {
  if(vote == 0) {
    return(
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes have been cast</p>
      </div>
    )
  }
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <IndVotes numVote={vote} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length-1).fill(0))

  const getRandomInt = (max) => Math.floor(Math.random() * max)

  const handleClick = () => setSelected(getRandomInt(anecdotes.length-1))
  
  const handleVote = (index) => {
    const handler = () => {
      const copy = [...votes]
      copy[index] += 1
      setVotes(copy)
    }
    return handler
  }

  const mostPop = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Display anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button onClick={handleVote(selected)} text="vote" />
      <Button onClick={handleClick} text="next anecdote" />
      <DisplayPop anecdote={anecdotes[mostPop]} vote={votes[mostPop]} />
    </div>
  )
}

export default App