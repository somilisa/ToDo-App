import React from 'react';
import List from './List';
// import Alert from './Alert';

function App() {
  const [value, setValue] = React.useState('');
  const [list, setList] = React.useState([]);
  const [editFlag, setEditFlag] = React.useState(false);
  const [editID, setEditID] = React.useState(null);
  const [alert, setAlert] = React.useState({ show: false, msg: '', type: '' });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) {
      //display alert
    } else if (value && editFlag) {
      //deal with edit
    } else {
      const newItem = { id: crypto.randomUUID(), name: value };
      setList([...list, newItem]);
      console.log('hello world');
      setValue('');
    }
  };
  return (
    <section className='center'>
      <form className='todo-form' onSubmit={handleSubmit}>
        <p className='alert'></p>

        <h3>To-Do List</h3>

        <div className='form-control'>
          <input
            type='text'
            id='todo'
            placeholder='eggs'
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <button className='submit-btn' type='submit'>
            {editFlag ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {/* {alert.show && <Alert />} */}
      <div id='todo-Container'>
        <List items={list} />
        <button
          onclick='clearItems()'
          className='clear-btn'
          // className='hide-container'
        >
          clear items
        </button>
      </div>
    </section>
  );
}

export default App;
