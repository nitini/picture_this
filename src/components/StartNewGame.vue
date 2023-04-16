<template>
    <div class="start-new-game">
      <h1>Start a New Game</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="userName">User Name:</label>
          <input type="text" id="userName" v-model="userName" required />
        </div>
        <div>
          <label for="gameName">Game Name:</label>
          <input type="text" id="gameName" v-model="gameName" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters } from 'vuex'
  export default {
    name: "StartNewGame",
    data() {
      return {
        userName: "",
        gameName: "",
      };
    },
    computed: {
        ...mapGetters(['gameSessions'])

    },

    methods: {
        ...mapActions(['saveGameSession']),
        async submitForm() {
            console.log("User Name:", this.userName);
            console.log("Game Name:", this.gameName);
            const gameSession = {
                gameName: this.gameName,
                userName: this.userName
            }
            const response = await this.saveGameSession(gameSession)
            if (response && response.data.status === 'success') {
                console.log(response)
                this.$router.push({ name: 'GamePage', params: { gameId: response.data.gameId } });
            } else {
                console.log(response)
                console.log("Erroring here")
             // Handle any errors that occurred during gameSession creation
            }
      },
    },
  };
  </script>
  
  <style scoped>
  .start-new-game {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  button {
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 14px;
  }
  </style>