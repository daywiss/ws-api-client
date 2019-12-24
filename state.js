const set = require('@daywiss/utils/set')
const unset = require('@daywiss/utils/unset')
module.exports = (state={}) => (channel,[path=[],data]) =>{
  if(path.length){
    if(data === null || data === undefined){
      unset(state,[channel,...path])
    }else{
      set(state,[channel,...path],data,Object)
    }
  }else{
    state[channel] = data
  }
  return state[channel]
}

