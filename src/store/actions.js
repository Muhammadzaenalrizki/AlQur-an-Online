export default {
     fetchGet(context,URL){
      fetch(URL).then(res=>res.json()).then(res=>{
           context.commit('Get',res)
        })
    },
  detailSurah(context,URL){
      fetch(URL).then(res=>res.json()).then(res=>{
           context.commit('detailSurah',res)
        })
    }
}