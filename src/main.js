import { createApp } from 'vue'
import App from './App.vue'

//import primevue, its icons and a primevue theme
import PrimeVue from 'primevue/config'
import Theme from '@primeuix/themes/nora'
import 'primeicons/primeicons.css'

const app = createApp(App);

// tell it to use the theme
app.use(PrimeVue, {
    theme: {
        preset: Theme,
        options: {
            darkModeSelector: false //white mode or smth
        }
    }
});

app.mount('#app')