// src/store/index.js
import { createStore } from 'vuex';
import api from '@/api';

const store = createStore({
  state: {
    // Define your state properties here
    gameSessions: []
  },
  mutations: {
    setGameSession(state, payload) {
        state.gameSession = payload;
      },
    addGameSession(state, gameSession) {
    state.gameSessions.push(gameSession);
    }    
    },
  actions: {
    // Perform API calls or other tasks here, and then update the state using mutations
    async fetchGameSessions({ commit }) {
        const response = await api.getGameSessions();
        commit('setGameSessions', response.data.gameSessions);
      },

    async saveGameSession({ commit }, gameSession) {
        try {
            const response = await api.createGameSession(gameSession);
            if (response.data.status === 'success') {
                console.log("Made it to success in SaveGameSession")
                commit('addGameSession', gameSession);
                console.log(response)
                return response
            }
        } catch (error) {
            return {status: 'error', error: error.message }
        }
    }
  },
  getters: {
    // Define your getters here
    gameSessions: (state) => state.gameSessions
  },
  modules: {
    // Define your modules here (optional, for more complex state management)
  },
});

export default store;