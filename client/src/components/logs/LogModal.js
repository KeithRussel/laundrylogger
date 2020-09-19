import React, { useState, useContext, useEffect } from 'react';
import LogContext from '../../context/log/logContext';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Modal, Button } from 'react-materialize';
import OptionLaunderers from '../launderers/OptionLaunderers';

const LogModal = () => {
  const logContext = useContext(LogContext);

  // const d = Date(Date.now());
  // let a = d.toString();

  const [log, setLog] = useState({
    message: '',
    kilo: '',
    attention: false,
    launderer: '',
    date: Date(Date.now()),
  });

  const { addLog, current, clearCurrent, updateLog } = logContext;
  // const newDate = new Date();
  useEffect(() => {
    if (current !== null) {
      setLog(current);
      console.log('Edit State');
    } else {
      setLog({
        message: '',
        kilo: '',
        attention: false,
        launderer: '',
        date: Date(Date.now()),
      });
    }
  }, [logContext, current]);

  const { message, kilo, attention, launderer } = log;

  const multiCalls = (e) => {
    onChange(e);
    onCheck(e);
  };

  const onChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const onCheck = (e) => {
    const name = e.target.name;
    setLog({ ...log, [name]: e.target.checked });
    console.log('onCheck clicked');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (current === null) {
      addLog(log);
    } else {
      updateLog(log);
      console.log('Update Log');
    }

    if (message === '' || kilo === '' || launderer === '') {
      M.toast({ html: 'Please enter all fields' });
    } else if (current) {
      console.log(log);
      M.toast({ html: 'Log updated!' });
    } else {
      console.log(log);
      M.toast({ html: `Log added` });
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Modal
      id='log-form-modal'
      actions={[
        <Button modal='close' node='button' waves='green' onClick={onSubmit}>
          Submit
        </Button>,
      ]}
      bottomSheet={false}
      fixedFooter={false}
      header={current ? 'Edit Laundry Log' : 'Add Laundry Log'}
      // open={false}
      options={{
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%',
      }}
    >
      <div className='row'>
        <form className='col s12' onSubmit={onSubmit}>
          <div className='row'>
            <div className='input-field col s12'>
              <textarea
                id='message'
                name='message'
                value={message}
                onChange={onChange}
                className='materialize-textarea'
              ></textarea>
              <label htmlFor='message' className={current ? 'active' : ''}>
                Message..
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s3'>
              <input
                id='kilo'
                name='kilo'
                type='number'
                value={kilo}
                onChange={onChange}
              />
              <label htmlFor='kilo' className={current ? 'active' : ''}>
                Kilo
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s6'>
              <select
                className='browser-default'
                name='launderer'
                value={launderer}
                onChange={onChange}
                as='select'
              >
                <option value='' disabled>
                  Choose Launderer
                </option>
                <OptionLaunderers launderer={launderer} />
              </select>
            </div>
          </div>
          <div className='row' style={{ marginLeft: '0' }}>
            <label>
              <input
                id='indeterminate-checkbox'
                type='checkbox'
                checked={attention ? true : false}
                name='attention'
                // value={attention}
                onChange={multiCalls}
                // checked={true}
              />
              <span>Urgent</span>
            </label>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LogModal;
