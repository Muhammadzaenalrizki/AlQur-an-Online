export default{
    Get(state,res){
  return   state.listSurah=res.data
    },
    detailSurah(state,res){
return state.detailSurah=res.data
    }
}