import { createApp } from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import SearchResults from './components/SearchResults.vue'

const app = createApp(App);

//Importing components:
app.component('header-component', Header);
app.component('search-component', Search);
app.component('search-results-component', SearchResults);

app.mount('#app')
