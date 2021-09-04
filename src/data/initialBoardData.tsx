export const initialBoardData = {
    items: {
        'item-1': { _id: 'item-1', status: 'Wash me.'},
        'item-2': { _id: 'item-2', status: 'Content of item 2.'},
        'item-3': { _id: 'item-3', status: 'Content of item 3.'}
    //   'item-4': { id: 'item-4', content: 'Content of item 4.'},
    //   'item-5': { id: 'item-5', content: 'Content of item 5.'},
    //   'item-6': { id: 'item-6', content: 'Content of item 6.'},
    //   'item-7': { id: 'item-7', content: 'Content of item 7.'}
    },
    columns: {
      'column-todo': {
        id: 'column-todo',
        title: 'To Do',
        itemsIds: [ 'item-1' , 'item-2' ]
      },
      'column-inprogress': {
        id: 'column-inprogress',
        title: 'In Progress',
        itemsIds: ['item-3']
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