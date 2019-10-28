const handlers = {
  get(target, prop, receiver){
    console.log('get',target,prop)
    return Object(target)[prop]
  },
}

function set(obj,props=[],value){
  if(props.length === 0) return value
  const prox = new Proxy(obj,handlers)
  let next = prox
  const len = props.length
  for(var i = 0; i < len; i++){
    // console.log(next[props[i]],props[i])
    next = new Proxy(next[props[i]],handlers)
  }
  next = value
  return obj
}

function get(obj,props=[],def){
  if(props.length === 0){
    if(obj === undefined) return def
    return obj
  }
  const prox = new Proxy(obj,handlers)
  let next = prox
  props.forEach(prop=>{
   next = next[prop]
  })

  if(next === undefined) return def

  return next
}
function unset(obj,props){
  if(props.length === 0) return
  const prox = new Proxy(obj,handlers)
  let next = prox

  for(let i = 0; i < props.length - 1; i++){
    next = next[props[i]]
  }

  delete next[props[props.length -1]]
}
module.exports = {
  set,get,unset
}
