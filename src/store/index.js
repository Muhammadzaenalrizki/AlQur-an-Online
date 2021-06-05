import { createStore } from 'vuex'
import actions from './actions.js'
// Create a new store instance.
import mutations from './mutation.js'
// import state from './state.js'
const store = createStore({
    state:{
            listSurah:[],
            detailSurah:[],
            play:false
        }
    ,
 mutations,
 actions
})

export default store