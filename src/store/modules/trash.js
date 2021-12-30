import Trash from '@/apis/trashs';
import {Message} from 'element-ui'

const state = {
  trashNotes: null,
  curTrashNoteId: null
}

const getters = {
  trashNotes: state => state.trashNotes || [],

  curTrashNote:(state, getters)=>{
    if(!state.curTrashNoteId) return getters.trashNotes[0] || {}
    return state.trashNotes.find(note => note.id === parseInt(state.curTrashNoteId)) || {}
  },

  belongTo:(state, getters, rootState, rootGetters) => {
    let notebook = rootGetters.notebooks.find(notebook =>
      notebook.id === parseInt(getters.curTrashNote.notebookId)) || {}
    return notebook.title || ''
  }
}

const mutations = {
  setTrashNotes(state, payload) {
    state.trashNotes = payload.trashNotes
  },

  addTrashNote(state, payload){
    setTrashNotes.unshift(payload.note)
  },

  deleteTrashNote(state, payload){
    state.trashNotes = state.trashNotes.filter(note => note.id !== payload.noteId)
  },

  setCurTrashNote(state, payload){
    state.curTrashNoteId = payload.curTrashNoteId
  }
}

const actions = {
  getTrashNotes({commit}){
    return Trash.getAll()
      .then(res => {
        commit('setTrashNotes', {trashNotes: res.data})
      })
  },

  deleteTrashNote({commit}, payload){
    return Trash.deleteNote({noteId: payload.noteId})
      .then(res => {
        commit('deleteTrashNote', {noteId:payload.noteId})
        Message.success(res.msg)
      })
  },
  revertTrashNote({commit}, payload){
    return Trash.revertNote({noteId: payload.noteId})
      .then(res => {
        commit('deleteTrashNote', {noteId:payload.noteId})
        Message.success(res.msg)
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
