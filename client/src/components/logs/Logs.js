import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LogContext from '../../context/log/logContext';
import LogItem from '../logs/LogItem';
import Preloader from '../layout/Preloader';

const Logs = () => {
  const logContext = useContext(LogContext);

  const { logs, filtered, getLogs, loading } = logContext;

  // if (loading || logs === null) {
  //   return <Preloader />;
  // }

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (logs !== null && logs.length === 0 && !loading) {
    return <h4>Please add logs</h4>;
  }

  return (
    <Fragment>
      {logs !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((log) => (
                <CSSTransition key={log._id} timeout={500} classNames='item'>
                  <LogItem log={log} />
                </CSSTransition>
              ))
            : logs.map((log) => (
                <CSSTransition key={log._id} timeout={500} classNames='item'>
                  <LogItem log={log} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Preloader />
      )}
    </Fragment>
  );
};

export default Logs;
