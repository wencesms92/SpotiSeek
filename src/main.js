import { createApp } from 'vue'
import App from './App.vue'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import SearchResults from './components/SearchResults.vue'
import RecommendedItems from './components/RecommendedItems.vue'
import RecommendedGenres from './components/RecommendedGenres.vue'
import TrendingItems from './components/TrendingItems.vue'
import Footer from './components/Footer.vue'

const app = createApp(App);

//Adding components to the App instance:
app.component('header-component', Header);
app.component('search-component', Search);
app.component('search-results-component', SearchResults);
app.component('search-component', Search);
app.component('recommended-items-component', RecommendedItems);
app.component('recommended-genres-component', RecommendedGenres);
app.component('trending-items-component', TrendingItems);
app.component('footer-component', Footer);

app.mount('#app')
