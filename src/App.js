import React, {useEffect} from  'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list)
  }
  else{
    return []
  }
}

function App() {
  const [value, setValue] = React.useState('');
  const [list, setList] = React.useState(getLocalStorage())
  const [editFlag, setEditFlag] = React.useState(false);
  const [editID, setEditID] = React.useState(null);
  const [alert, setAlert] = React.useState({ show: false, msg: '', type: '' });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) {
      displayAlert(true, 'Pls enter a value', 'danger');
    } else if (value && editFlag) {
      displayAlert(true, 'Item updated', 'success');
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, name: value };
          }
          return item;
        })
      );
      setValue('');
      setEditID(null);
      setEditFlag(false);
    } else {
      displayAlert(true, 'Item added to list', 'success');
      const newItem = { id: crypto.randomUUID(), name: value };
      setList([...list, newItem]);
      setValue('');
    }
  };
  const displayAlert = React.useCallback(
    (show = false, msg = '', type = '') => {
      setAlert({ show: show, msg: msg, type: type });
    },
    []
  );
  const clearList = () => {
    displayAlert(true, 'empty list', 'danger');
    setList([]);
  };
  const removeItem = (id) => {
    displayAlert(true, 'Item removed', 'danger');
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const targetItem = list.find((item) => item.id === id);
    setEditFlag(true);
    setEditID(id);
    setValue(targetItem.name);
  };
  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(list))
   
  }, [list])
  return (
    <section className='center'>
      <form className='todo-form' onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={displayAlert} list={list} />
        )}
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
      {list.length > 0 && (
        <div id='todo-Container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button
            onClick={clearList}
            className='clear-btn'
            // className='hide-container'
          >
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
