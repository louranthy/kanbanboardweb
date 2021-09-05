export const initialBoardData = {
    items: {
    },
    columns: {
      'column-todo': {
        id: 'column-todo',
        title: 'To Do',
        itemsIds: []
      },
      'column-inprogress': {
        id: 'column-inprogress',
        title: 'In Progress',
        itemsIds: []
      },
      'column-done': {
        id: 'column-done',
        title: 'Done',
        itemsIds: []
      }
    },
    columnsOrder: ['column-todo', 'column-inprogress', 'column-done']
  }