import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import short from 'short-uuid'

const store = createStore({

    plugins: [createPersistedState()],
    // state
    state: {
       contact: [{
            id: short.generate(),
            first_name: "Sohrab",
            last_name: "Sheikhani",
            phone_number: "+14244048668",
            isFavorite: true,
            created_at: "2021-07-08 17:00:00",
       }],
       ifExist: false
    },
    // getters
    getters: {
        contact: state => state.contact,
        ifExist: (state) => state.ifExist
    },

    // mutations
    mutations: {
        addNewContact: (state, newContact) => state.contact.push(newContact),
        removeContact: (state, id) =>
        (state.contact = state.contact.filter(item => item.id != id)),
        updateContact: function (state, payload) {
            state.contact = state.contact.map(item => {
                if (item.id === payload.id) {
                  return Object.assign({}, item, payload)
                }
                return item
            })
        },
        setToFavorites: (state) =>
        (state.contact = state.contact.filter(item => item.isFavorite === true)),

        showAll(state, data) {
            state.contact = data
        }, 

        checkIfNumberAlreadyExist: function (state, phone_number) {
            state.contact.map(item => {
                if (item.phone_number === phone_number) {
                    state.ifExist = true
                }else{
                    state.ifExist = false
                }
            })
        },

    },

    // actions
    actions:  {
        addContactAction: function ({commit}, newContact) {
            commit('addNewContact', newContact)
            commit('checkIfNumberAlreadyExist', newContact.phone_number)
        },
        removeContactAction: ({ commit }, id) => commit('removeContact', id),
        updateContactAction: function ({commit}, payload) {
            commit('updateContact', payload)
        },
        setToFavoritesAction: function ({commit}) {
            commit('setToFavorites')
        },
        showAllAction: function ({commit}, data) {
            commit('showAll', data)
        },
        checkIfExistingAction: function ({commit}, data) {
            commit('checkIfNumberAlreadyExist', data)
        }
    },
    
})

export default store

