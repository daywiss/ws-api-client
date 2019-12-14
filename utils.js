exports.setProxy = (obj,path=[],val)=>{
  const handlers = {
    get(target, prop, receiver){
      if(target[prop] === undefined) target[prop] = {}
      return target[prop]
    },
    set(target, prop, value){
      target[prop] = value
      return true

    }
  }
  const prox = new Proxy(obj,handlers)

  let curr = prox
  path.forEach(prop=>{
    curr = curr[prop]
  })
  curr = val
  return val
}

exports.getProxy = (obj,path=[],def)=>{
  const handlers = {
    get(target, prop, receiver){
      if(target[prop] === undefined) target[prop] = {}
      return target[prop]
    },
    set(target, prop, value){
      target[prop] = value
      return true

    }
  }
  const prox = new Proxy(obj,handlers)
  let curr = prox
  path.forEach(prop=>{
    curr = curr[prop]
  })
  if(curr === undefined) return def
  return curr
}

exports.touch = (obj,path=[]) => {
  if(path.length === 0){
    return {...obj}
  }
  const head = path[0]

  if(path.length === 1){
    return {
      ...obj,
      [head]:{...obj[head]}
    }
  }

  return exports.touch(copy[head],path.slice(1))
}

exports.set = (obj,path=[],val)=>{
  if(path.length === 0){
    return val
  }
  if(path.length === 1){
    obj[path[0]] = val
    return obj
  }

  const [head,...rest] = path
  const child = obj[head]
  //if child exists, create a new object, otherwise its null and make an object
  obj[head] = (child != null) ? {...child} : {}

  exports.set(obj[head],rest,val)
  return val
}

exports.unset = (obj,path=[])=>{
  if(obj === undefined) return
  if(path.length === 0){
    return obj
  }

  const [head,...rest] = path

  if(path.length === 1){
    return delete obj[head]
  }

  return exports.unset(obj[head],rest)
}

exports.get = (obj,path=[],def)=>{
  if(obj == null) return def
  if(path.length === 0){
    return obj
  }
  const [head,...rest] = path
  return exports.get(obj[head],rest,def)
}
