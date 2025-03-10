import { useState } from 'react';

function LineVotes(data) {
  const {vote} = data;
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{vote.anecdotes[vote.selected]}</p>
      <p>Has {vote.votes[vote.selected]} votes</p>
      <div>
        <button onClick={() => vote.VoteIndex(vote.selected)}>Vote</button>
        <button onClick={vote.RandomIndex}>Next anecdote</button>
      </div>
    </div>
  );
}

function MostVoted(data) {
  const { text, quantity } = data;
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{text}</p>
      <p>Has {quantity} votes</p>
    </div>
  );
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  function RandomIndex() {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  function VoteIndex(vote) {
    const newVotes = [...votes];
    newVotes[vote] += 1;
    setVotes(newVotes);
  }

  const maxVotesIndex = votes.indexOf(Math.max(...votes));

  const data = {
    anecdotes,
    selected,
    votes,
    VoteIndex,
    RandomIndex
  };

  return (
    <div>
      <LineVotes vote={data} />
      <MostVoted text={anecdotes[maxVotesIndex]} quantity={votes[maxVotesIndex]} />
    </div>
  );
}

export default App;