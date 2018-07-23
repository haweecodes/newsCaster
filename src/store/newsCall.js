
import axios from 'axios'
import apiCall from '@/router/apiCall.js'
const state = {
  eventList: [],
  eventTypeList: [],
  listView: true,
  isEventEdited: {
    flag: false,
    eventId: -1
  }
}

const getters = {
}
const actions = {
  getNews ({commit}) {
    return new Promise(function (resolve) {
      axios.get(apiCall.news).then(function (response) {
        resolve(response.data)
      })
    })
  },
  getSources ({commit}) {
    return new Promise(function (resolve) {
      axios.get(apiCall.newsSource).then(function (response) {
        resolve(response.data)
      })
    })
  },
  getAllNews ({commit}, payload) {
    return new Promise(function (resolve) {
      axios.get(apiCall.allNews + payload + '&apiKey=' + apiCall.key).then(function (response) {
        resolve(response.data)
      })
    })
  },
  getCategory ({commit}, payload) {
    return new Promise(function (resolve) {
      axios.get(apiCall.category + payload + '&apiKey=' + apiCall.key).then(function (response) {
        resolve(response.data)
      })
    })
  }
}
const mutations = {
  setEventList (state, payload) {
    Object.assign(state.eventList, payload)
  }
}

export default {state, getters, actions, mutations}
