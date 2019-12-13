import React, {useEffect, useState} from 'react';
import './App.css';

import Service from "../../services/service";

function App() {

  const newService = new Service();
  const [initialBalance, setInitialBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(false);
  const [percentRange, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setProgress(percentRange + (100 / 15));
      setInitialBalance(Math.round((initialBalance + 1) * 100) / 100);
      if (initialBalance >= balance.balance_usd) {
        setInitialBalance(Math.round((initialBalance + 0.2) * 100) / 100);
        setProgress(percentRange + 1.5);
      }
    };
    if (percentRange < 100) {
      setTimeout(updateProgress, (initialBalance > balance.balance_usd) ? 2000 : 500)
    }
    loadedBalance();
  }, [percentRange, initialBalance]);

  function loadedBalance() {
    newService.getBalance()
      .then(res => {
        setBalance(res);
        setError(false);
      })
      .catch(reason => {
        setError(true);
      })
  }

  const content = !error ? <View
    balance={balance}
    initialBalance={initialBalance}
    percentRange={percentRange}
    setProgress={setProgress}/> : null;

  return (
    <div className="App">
      <header className="App-header">
        {content}
      </header>
    </div>
  );
}

export default App;

const View = ({initialBalance, percentRange}) => {

  let classNames = 'more';
  let btnClass = 'target_btn';

  if (initialBalance === 15) {
    classNames = 'more_none';
    btnClass += ' color'
  }
  return (
    <>
      <h4>Scrile</h4>
      <div id='target'>
        <header className="header"><h4>Target indicator Demo</h4></header>
        <div className="inside">
          <div className="inside_block">
            <p>Reached: <span className="progress-bar"><div className="range" style={{width: `${percentRange}%`}}/>
              <div className="range_money" style={{width: `${percentRange}%`, textAlign: 'end', fontSize: '13px'}}>
                  <i className="fa fa-sort-asc" aria-hidden="true"/>
                <div>${initialBalance}</div>
              </div>
            </span>
            </p>
            <div className={btnClass}>
              <header>
                <a>Target</a>
              </header>
              <div>$15</div>
            </div>
          </div>
          <div className={classNames}><i className="fa fa-info-circle" aria-hidden="true"/>You need $1 more to reach
            your target.
          </div>
        </div>
      </div>
    </>
  )
};