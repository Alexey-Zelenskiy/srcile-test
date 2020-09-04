import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './App.css';

import Service from "../services";
import ErrorMessage from "../errorMessage";
import Spinner from "../spinner";
import {balanceLoaded, balanceError, balanceRequested} from '../redux/action';  

const App = (props) => {
  const dispatch = useDispatch();
  const balance = useSelector(state => state.balance);
  const newService = new Service();
  const [initialBalance, setInitialBalance] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
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
        dispatch(balanceLoaded(res))
        setError(false);
        setLoading(false);
      })
      .catch(reason => {
        setError(true);
        setLoading(false)
      })
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content  = !(loading || error) ? <View
    balance={balance}
    initialBalance={initialBalance}
    percentRange={percentRange}
    setProgress={setProgress}/> : null;


  return (
    <div className="App">
      <header className="App-header">
        {errorMessage}
        {spinner}
        {content}
      </header>
    </div>
  );
}

export default App;

const View = ({initialBalance, percentRange, balance}) => {

  let classNames = 'more';
  let btnClass = 'target_btn';

  if (initialBalance === 15) {
    classNames = 'more_none';
    btnClass += ' color'
  }
  return (
    <>
      <div id='target'>
        <header className="header"><h4 className='target_text'>Target indicator Demo</h4></header>
        <div className="inside">
          <div className="inside_block">
            <p>Reached: <span className="progress-bar"><div className="range" style={{width: `${percentRange}%`}}/>
              <div className="range_money" style={{width: `${percentRange}%`, textAlign: 'end', fontSize: '13px'}}>
                {percentRange > 0 ? <div>
                  <i className="fa fa-sort-asc" aria-hidden="true"/>
                <div className='target_money'>${initialBalance}</div>
                </div> : null}
              </div>
            </span>
            </p>
            <div className={btnClass}>
              <header>
                <a>Target</a>
              </header>
              <div className='money'>$15</div>
            </div>
          </div>
          <div className={classNames}><i className="fa fa-info-circle" aria-hidden="true"/>  You need $1 more to reach
            your target.
          </div>
        </div>
      </div>
    </>
  )
};