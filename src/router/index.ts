import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("@src/views/Home.vue"),
        },
        {
            path: "/game",
            name: "Configuration",
            component: () => import("@src/views/Game.vue"),
        },
        {
            path: "/donate",
            name: "Donate",
            component: () => import("@src/views/Donate.vue"),
        },
    ]
});


export default router;