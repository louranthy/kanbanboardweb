import * as React from 'react'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { initialBoardData } from '../data/initialBoardData'
import { BoardColumn } from './BoardColumn'
import  axios from 'axios';
import { useEffect } from 'react'
import getTasks from '../services/tasks.services'


const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
type State = {
  items : object,
  columns: object
  columnsOrder : Array<string>,
  tasks : object
}

const initialState:State = initialBoardData;

type Action = { type: 'setColumns', payload: object} |
{type: 'setColumnStart', payload: Array<string>} |
{type: 'setTasks', payload: object};

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
    case 'setTasks': 
      return {
        ...state,
        tasks: action.payload
      };
  }
}


const Board = () => {
  const fetchData = () => {
    getTasks()
        .then((res) => {

           initialState.tasks = res.data;
          
        })
        .catch((err) => {
        
        });
  };
   useEffect(() => {
        fetchData();
    }, []);


  let [state, dispatch] = React.useReducer(reducer, initialState);
   
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result

    console.log(source);
    
    console.log(destination);
    console.log(draggableId);
    if (!destination) {
      return
    }

    // Do nothing if the item is dropped into the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Find column from which the item was dragged from
    const columnStart = (state.columns as any)[source.droppableId]

    // Find column in which the item was dropped
    const columnFinish = (state.columns as any)[destination.droppableId]

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list
      const newItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newItemsIds.splice(source.index, 1)

      // Insert the id of dragged item to the new position
      newItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for columns
   
      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds
      }

      // Create new board state with updated data for columns
      dispatch({
        type: 'setColumns',
        payload:  {
          ...state.columns,
          [newColumnStart.id]: newColumnStart
        }
      });

    } else {
 
      const newStartItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newStartItemsIds.splice(source.index, 1)

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds
      }

      const newFinishItemsIds = Array.from(columnFinish.itemsIds)

      // Insert the id of dragged item to the new position in destination list
      newFinishItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds
      }

    
      dispatch({
        type: 'setColumns',
        payload:  {
          ...state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      });

     
    }
  }


    return(
      <BoardEl>
        {/* Create context for drag & drop */}
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Get all columns in the order specified in 'board-initial-data.ts' */}
          {state.columnsOrder.map(columnId => {
            // Get id of the current column
            const column = (state.columns as any)[columnId]

            // Get item belonging to the current column
            const items = column.itemsIds.map((itemId: string) => (state.items as any)[itemId])
            console.log(items)
            // Render the BoardColumn component
            return <BoardColumn key={column.id} column={column} items={items} />
          })}
        </DragDropContext>
      </BoardEl>
    )
}

export default Board;