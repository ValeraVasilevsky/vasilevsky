import "@/main.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add();

const pinia = createPinia();

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia).mount("#app");
