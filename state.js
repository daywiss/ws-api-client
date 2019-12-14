const {set,unset} = require('./utils')
// const set = require('lodash.setwith')
// const unset = require('lodash.unset')
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

