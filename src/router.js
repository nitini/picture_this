import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/components/HomePage.vue";
import StartNewGame from "@/components/StartNewGame.vue";
import GamePage from "@/components/GamePage.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/start-new-game",
    name: "StartNewGame",
    component: StartNewGame,
  },
  {
    path: '/game/:gameId',
    name: 'GamePage',
    component: GamePage,
  }
];

const router = new createRouter({
  history:createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
