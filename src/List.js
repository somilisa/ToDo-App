import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
function List({ items, removeItem, editItem }) {
  return (
    <ul className='todo-list'>
      {items.map(({ id, name }) => {
        console.log(name);
        return (
          <li key={id} className='todo-item'>
            <p className='title'>{name}</p>
            <div className='btn-container'>
              <button type='button' className='edit-btn' onClick={() => editItem(id)}>
                <FaEdit/>
              </button>
              <button type='button' className='delete-btn' onClick={()=> removeItem(id)}>
                <FaTrash/>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
