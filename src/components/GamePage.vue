<template>
    <div>
      <aside>
        <h2>Players</h2>
        <ul>
          <li v-for="player in players" :key="player.id">
            {{ player.userName }}
          </li>
        </ul>
      </aside>
  
      <main>
        <h1>Access Code</h1>
        <p class="access-code">{{ accessCode }}</p>
      </main>
    </div>
  </template>
  
  <script>
  import api from '@/api';
  export default {
    data() {
      return {
        players: [],
        accessCode: '',
      };
    },
    mounted() {
      this.fetchPlayers();
      this.generateAccessCode();
    },
    methods: {
        async fetchPlayers() {
// Replace the existing code with the following line
        const players = await api.fetchPlayersByGameId(this.$route.params.gameId);
        if (players) {
            this.players = players;
        }
        },
        generateAccessCode() {
        // Generate a random access code for the game
            this.accessCode = Math.random().toString(36).substr(2, 6).toUpperCase();
        },
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles for the GamePage component */
  </style>