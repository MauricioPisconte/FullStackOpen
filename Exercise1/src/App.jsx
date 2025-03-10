import { useState } from 'react';

function BotonCalificacion(props) {
  const { texto, handleFunction } = props;
  return (
    <button onClick={handleFunction}>{texto}</button>
  );
}

function LineCalificacion(props) {
  const { texto, calificacion } = props;
  return (
    <tr>
      <td>{texto}</td>
      <td>{calificacion}</td>
    </tr>
  );
}

function Statistics(props) {
  const {stats} = props
  if(stats.total <= 0){
    return(
      <h4>No feedback given</h4>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <LineCalificacion texto="good" calificacion={stats.goodQuantity} />
          <LineCalificacion texto="neutral" calificacion={stats.neutralQuantity} />
          <LineCalificacion texto="bad" calificacion={stats.badQuantity} />
          <LineCalificacion texto="all" calificacion={stats.total} />
          <LineCalificacion texto="average" calificacion={stats.average.toFixed(2)} />
          <LineCalificacion texto="positive" calificacion={stats.positive.toFixed(2) + "%" }/>
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [goodQuantity, addGood] = useState(0);
  const [neutralQuantity, addNeutral] = useState(0);
  const [badQuantity, addBad] = useState(0);

  function IncrementGoodFB() { addGood(goodQuantity + 1); }
  function IncrementNeutralFB() { addNeutral(neutralQuantity + 1); }
  function IncrementBadFB() { addBad(badQuantity + 1); }

  const totalFB = goodQuantity + neutralQuantity + badQuantity;
  const averageFB = totalFB > 0 ? (goodQuantity - badQuantity) / totalFB : 0;
  const positiveFB = totalFB > 0 ? (goodQuantity / totalFB) * 100 : 0;

  const std = {
    goodQuantity,
    neutralQuantity,
    badQuantity,
    total: totalFB,
    average: averageFB,
    positive: positiveFB
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <BotonCalificacion texto="good" handleFunction={IncrementGoodFB} />
      <BotonCalificacion texto="neutral" handleFunction={IncrementNeutralFB} />
      <BotonCalificacion texto="bad" handleFunction={IncrementBadFB} />
      <Statistics stats={std} />
    </div>
  );
}

export default App;
