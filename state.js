const {set,unset} = require('ynk')
module.exports = (state={}) => (channel,[path=[],data]) =>{

  if(path.length){
    if(data === null || data === undefined){
      state[channel] = unset({...state[channel]},path)
    }else{
      state[channel] = set({...state[channel]},path,data)
    }
  }else{
    state[channel] = data
  }
  return state[channel]
}

