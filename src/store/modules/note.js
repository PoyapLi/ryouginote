import Note from '@/apis/notes';
import {Message} from "element-ui";

const state = {
  notes: null,
  curNoteId: null
}

const getters = {
  notes: state => state.notes || [],

  curNote: state => {
    if(!Array.isArray(state.notes)) return {}
    if(!state.curNoteId) return state.notes[0] || {}
    return state.notes.find(note =>
      note.id === parseInt(state.curNoteId)) || {}
  }
}

const mutations = {
  setNote(state, payload){
    state.notes = payload.notes
  },

  addNote(state, payload){
    state.notes.unshift(payload.note)
  },

  updateNote(state, payload){
    let note = state.notes.find(note =>
      note.id === parseInt(payload.noteId)) || {}
    note.title = payload.title
    note.content = payload.content
  },

  deleteNote(state, payload){
    state.notes = state.notes.filter(note =>
      note.id !== payload.noteId)
  },

  setCurNote(state, payload){
    state.curNoteId = payload.curNoteId
  }
}

const actions = {
  getNotes({commit}, payload){
    return Note.getAll({notebookId: payload.notebookId})
      .then(res => {
        commit('setNote',{notes: res.data})
      })
  },
  addNote({commit}, payload){
    return Note.addNote({notebookId: payload.notebookId},{title: payload.title, content: payload.content})
      .then(res => {
        commit('addNote',{note: res.data})
      })
  },
  updateNote({commit}, payload){
    return Note.updateNote({noteId:payload.noteId},{title: payload.title, content: payload.content})
      .then(res => {
        commit('updateNote', {noteId: payload.noteId, title: payload.title, content: payload.content})
      })
  },
  deleteNote({commit}, payload){
    return Note.deleteNote({noteId: payload.noteId})
      .then(res => {
        commit('deleteNote',{noteId: payload.noteId})
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
