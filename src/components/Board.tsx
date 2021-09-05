// @ts-nocheck

import * as React from 'react'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { initialBoardData } from '../data/initialBoardData'
import { BoardColumn } from './BoardColumn'
import  axios from 'axios';
import { useEffect } from 'react'
import getTasks from '../services/get.tasks.services'
import updateTask from '../services/update.tasks.services'
import createTask from '../services/create.tasks.services'
import FormDialog from './CreateBoardItemModal'


const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
type State = {
  items : object
  columns: object
  columnsOrder : Array<string>
  newTask : string
}

const initialState:State = initialBoardData;

type Action = { type: 'setColumns', payload: object} |
{type: 'setColumnStart', payload: Array<string>} |
{type: 'setItems', payload: object} |
{type: 'setNewTask', payload: string};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setColumns': 
      return {
        ...state,
        columns: action.payload
      };
    case 'setColumnStart': 
      return {
        ...state,
        columns: action.payload
      };
    case 'setItems': 
      return {
        ...state,
        items: action.payload
    };
    case 'setNewTask': 
      return {
        ...state,
        newTask: action.payload
    };
  }
}


const Board = () => {

  let [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    getTasks().then((response) => {
      let columns = [state.columns];
      const newObject = {};
      for (const key of Object.keys(response.data)) {
        let newKey = response.data[key]['_id'];
        delete Object.assign(newObject, response.data, {[newKey]: response.data[key] })[key];
        delete response.data[key];
    
      }
      dispatch({
        type: 'setItems',
        payload: newObject
      })
      for (const key of Object.keys(newObject)) {
         if(newObject[key]['status'] === "To Do"){
           columns[0]['column-todo'].itemsIds.push(key);
         }else if (newObject[key]['status'] === "In Progress"){
           columns[0]['column-inprogress'].itemsIds.push(key);
         }else if (newObject[key]['status'] === "Done"){
           columns[0]['column-done'].itemsIds.push(key);
         }
      }
     
        dispatch({
          type: 'setColumns',
          payload: columns[0]
        })

  }) 
  }, []);

  const onCreate = (task: any) => {
    var item = {
      "task": task,
      "startedAt": "08/31/2021 08:10:10",
      "status": "To Do",
      "finishedAt": "",
      "calculatedCost": 0
    }
    
    createTask(item).then((response) => {
      dispatch({
        type: 'setColumns',
        payload:  {
          ...state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      });
    });
  }

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    const columnStart = (state.columns as any)[source.droppableId]
    const columnFinish = (state.columns as any)[destination.droppableId]

    if (columnStart === columnFinish) {
      const newItemsIds = Array.from(columnStart.itemsIds)
      newItemsIds.splice(source.index, 1)
      newItemsIds.splice(destination.index, 0, draggableId)   
      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds
      }

      dispatch({
        type: 'setColumns',
        payload:  {
          ...state.columns,
          [newColumnStart.id]: newColumnStart
        }
      });

    } else {
 
      const newStartItemsIds = Array.from(columnStart.itemsIds)
      newStartItemsIds.splice(source.index, 1)

      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds
      }
      
      let items = state.items;
      let column = (state.columns as any)[destination.droppableId];
  
      items[draggableId].status = column.title;
      let item = items[draggableId];

      const newFinishItemsIds = Array.from(columnFinish.itemsIds)

      newFinishItemsIds.splice(destination.index, 0, draggableId)

      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds
      }

      updateTask(item).then((response) => {
        dispatch({
          type: 'setItems',
          payload:  items
        });
        dispatch({
          type: 'setColumns',
          payload:  {
            ...state.columns,
            [newColumnStart.id]: newColumnStart,
            [newColumnFinish.id]: newColumnFinish
          }
        });
      });

    }
  }

    return(
     
      <BoardEl>
        <FormDialog state={state} dispatch={dispatch} addTask={onCreate}/>
        {/* Create context for drag & drop */}
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Get all columns in the order specified in 'board-initial-data.ts' */}
          {state.columnsOrder.map(columnId => {
            const column = (state.columns as any)[columnId]

            const items = column.itemsIds.map((itemId: string) => (state.items as any)[itemId])
            return <BoardColumn key={column.id} column={column} items={items} state={state} dispatch={dispatch}/>
          })}
        </DragDropContext>
      </BoardEl>
    )
}


export default Board;