export const initialBoardData = {
    items: {
      'item-1': { id: 'item-1', content: 'Content of item 1.'},
      'item-2': { id: 'item-2', content: 'Content of item 2.'},
      'item-3': { id: 'item-3', content: 'Content of item 3.'},
      'item-4': { id: 'item-4', content: 'Content of item 4.'},
      'item-5': { id: 'item-5', content: 'Content of item 5.'},
      'item-6': { id: 'item-6', content: 'Content of item 6.'},
      'item-7': { id: 'item-7', content: 'Content of item 7.'}
    },
    columns: {
      'column-todo': {
        id: 'column-todo',
        title: 'To Do',
        itemsIds: [ 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7']
      },
      'column-inprogress': {
        id: 'column-inprogress',
        title: 'In Progress',
        itemsIds: ['item-1']
      },
      'column-done': {
        id: 'column-done',
        title: 'Done',
        itemsIds: []
      }
    },
    columnsOrder: ['column-todo', 'column-inprogress', 'column-done'],
    tasks : {}
  }