<template>
    <div class="home-page">
      <h1>Picture This</h1>
      <div class="buttons">
        <button @click="startNewGame">Start a new game</button>
        <button @click="joinExistingGame">Join an existing game</button>
      </div>
    </div>
  </template>

<script>
export default {
  name: "HomePage",
  methods: {
    startNewGame() {
      this.$router.push({name: 'StartNewGame'})
      console.log("Start a new game");
    },
    joinExistingGame() {
      // Handle joining an existing game here
      console.log("Join an existing game");
    },
  },
};
</script>

<style scoped>
.home-page {
  text-align: center;
}

.buttons {
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>