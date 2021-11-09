import request from '@/helpers/request';
import {friendlyDate} from '@/helpers/util';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll(){
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          // 这样写也可以 res.data = res.data.sort((a,b)=> b.createdAt.localeCompare(a.createdAt))
          res.data = res.data.sort((a,b)=> a.createdAt <  b.createdAt ? 1 : -1)
          res.data.forEach(notebook => {
              notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
            })
          resolve(res)
        }).catch(err => {
          reject(err)
      })
    })
  },

  updateNotebook(notebookId, {title = ''} = {title:''}){
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
  },

  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  },

  addNotebook({title = ''} = {title:''}){
    return request(URL.ADD, 'POST', {title})
  }
}
