import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  },
});

export default {
  getGameSessions() {
    return apiClient.get('/api/gameSessions');
  },
  createGameSession(gameSession) {
    return apiClient.post('/api/gameSessions', gameSession);
  },

  async fetchPlayersByGameId(gameId) {
    try {
      const response = await apiClient.get(`/game/${gameId}/players`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch players for gameId:', gameId, error);
      return null;
    }
  }
};