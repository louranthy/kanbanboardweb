// @ts-nocheck

import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import moment from 'moment';
import updateTask from '../services/update.tasks.services';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    displayBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    }
  })
);

type BoardItemProps = {
  index: number
  item: any,
  columnId : string,
  displayButton : string,
  state: any,
  dispatch : any
}

type BoardItemStylesProps = {
  isDragging: boolean
}

const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 8px;
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  border-radius: 4px;
  transition: background-color .25s ease-out;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`

export const BoardItem = (props: BoardItemProps) => {
  const classes = useStyles();
  let disableButton = false;
  let display = props.displayButton;
  if(props.displayButton === "$"){
    disableButton = true;
    display = "$ " + props.item.calculatedCost;
  }
  const handleUpdate = (property : any) => {
    let item = property;
    console.log(item.status)
    if(item.status === "In Progress"){
      let finishedAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      let startedAt = moment(item.startedAt).format('YYYY-MM-DD HH:mm:ss');
      item.finishedAt = finishedAt;
      var diffInMinutes = moment(finishedAt).diff(moment(startedAt), 'minutes');
      item.status = "Done";
      item.calculatedCost = (diffInMinutes / 60) * 10;
        updateTask(item).then((response) => {
          const columnStart = (props.state.columns as any)['column-inprogress'];
         
          const columnFinish = (props.state.columns as any)['column-done'];
          const newStartItemsIds = Array.from(columnStart.itemsIds);
   
          newStartItemsIds.splice((props.state.columns as any)['column-inprogress'].index, 1);
          const newColumnStart = {
           ...columnStart,
           itemsIds: newStartItemsIds
         }
 
         const newFinishItemsIds = Array.from(columnFinish.itemsIds);
         newFinishItemsIds.splice((props.state.columns as any)['column-done'], 0, item._id);
    
         const newColumnFinish = {
           ...columnFinish,
           itemsIds: newFinishItemsIds
         }
         
         props.state.columns =  {
           ...props.state.columns,
           [newColumnStart.id]: newColumnStart,
           [newColumnFinish.id]: newColumnFinish
         }
        
         props.dispatch({
           type: 'setColumns',
           payload:  {
             ...props.state.columns,
             [newColumnStart.id]: newColumnStart,
             [newColumnFinish.id]: newColumnFinish
           }
         });
        });
    }
    else if(item.status === "To Do"){
      let finishedAt = "";
      let startedAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      item.finishedAt = finishedAt;
      item.startedAt = startedAt;
      item.status = "In Progress";
      item.calculatedCost = 0;
      
        updateTask(item).then((response) => {
          const columnStart = (props.state.columns as any)['column-todo'];
         
          const columnFinish = (props.state.columns as any)['column-inprogress'];
          const newStartItemsIds = Array.from(columnStart.itemsIds);
   
          newStartItemsIds.splice((props.state.columns as any)['column-todo'].index, 1);
          const newColumnStart = {
           ...columnStart,
           itemsIds: newStartItemsIds
         }
 
         const newFinishItemsIds = Array.from(columnFinish.itemsIds);
         newFinishItemsIds.splice((props.state.columns as any)['column-inprogress'], 0, item._id);
    
         const newColumnFinish = {
           ...columnFinish,
           itemsIds: newFinishItemsIds
         }
         
         props.state.columns =  {
           ...props.state.columns,
           [newColumnStart.id]: newColumnStart,
           [newColumnFinish.id]: newColumnFinish
         }
         
         props.dispatch({
           type: 'setColumns',
           payload:  {
             ...props.state.columns,
             [newColumnStart.id]: newColumnStart,
             [newColumnFinish.id]: newColumnFinish
           }
         });
        });
    }
   
  };

  function ShowTime(itemProp) {
    const item = itemProp;
    console.log(item);
    if (item.status === "In Progress") {
      return  <button
      variant="contained"
      size="large"
      color="secondary"
      className={classes.displayBtn}
      disabled= "disabled" >
         {item.startedAt}
    </button>;
    } else{
      return null;
    }
    
  }
  return <Draggable draggableId={props.item._id} index={props.index}>
    {(provided, snapshot) => (

      <BoardItemEl 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {}
        {props.item.task}<p></p>
        <ShowTime item={props.item} />
          <p></p>
        <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.displayBtn}
            onClick={() => handleUpdate(props.item)}
            disabled={disableButton}>
            {display}
          </Button>
      </BoardItemEl>
    )}
  </Draggable>
}

