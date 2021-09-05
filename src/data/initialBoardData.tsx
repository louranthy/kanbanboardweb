export const initialBoardData = {
    items: {
    },
    columns: {
      'column-todo': {
        id: 'column-todo',
        title: 'To Do',
        displayButton: 'Start',
        itemsIds: []
      },
      'column-inprogress': {
        id: 'column-inprogress',
        title: 'In Progress',
        displayButton: 'Resolve',
        itemsIds: []
      },
      'column-done': {
        id: 'column-done',
        title: 'Done',
        displayButton: '$',
        itemsIds: []
      }
    },
    columnsOrder: ['column-todo', 'column-inprogress', 'column-done']
  }