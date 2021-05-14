const Home = () => import('@/components/pages/Home.vue')
const detailSurah = () => import('@/components/pages/detailSurah.vue')
const routes = [
  { path: '/', component: Home,
name:'home' },
  { path: '/surah/:id', component: detailSurah,name:'detailSurah' },

]

export default routes