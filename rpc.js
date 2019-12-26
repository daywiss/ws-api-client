const {encode} = require('./utils')
module.exports = (config)=>{
  const pending = new Map()
  let id = 0


  function response(data){
    const [channel,id,result,err] = data
    if(!pending.has(id)) return 
    const [res,rej] = pending.get(id)
    if(err){ 
      [message,stack] = err
      const error = new Error(message)
      error.stack = stack
      rej(error)
    }else{
      res(result)
    }
    pending.delete(id)
  }

  function call(getWs,channel){
    return (action,...args)=>{
      return new Promise((res,rej)=>{
        pending.set(++id,[res,rej])
        try{
          getWs().send(encode([channel,id,action,args]))
        }catch(err){
          rej(err)
        }
      })
    }
  }

  return {
    call,
    response,
    pending,
  }
}
