import request from '@/helpers/request';
import {friendlyDate} from '@/helpers/util';

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  getAll(){
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          // 这样写也可以 res.data = res.data.sort((a,b)=> b.createdAt.localeCompare(a.createdAt))
          res.data = res.data.sort((a,b)=> a.createdAt <  b.createdAt ? 1 : -1)
          res.data.forEach(note => {
            note.createdAtFriendly = friendlyDate(note.createdAt)
            note.updatedAtFriendly = friendlyDate(note.updatedAt)
          })
          resolve(res)
        }).catch(err => {
          reject(err)
      })
    })
  },

  deleteNote(noteId) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },

  revertNote(noteId) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
  },
}
