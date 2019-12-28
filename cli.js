const argv = require('minimist')(process.argv.slice(2));
const Client = require('.')
const assert = require('assert')
const WS = require('ws')

const {
  channel,
  host,
  token,
  _,
  ...props
} = argv

const [action,...rest] = _

assert(channel,'requires an api channel')
assert(action,'requires an action')
let args = rest

if(Object.keys(props).length){
  args = props
}

async function Authenticate(auth,tokenid){
  return auth('authenticate',tokenid)
}

Client(WS,{host,channels:[channel,'auth']}).then(async ({actions,close})=>{
  try{
    if(token) await actions.auth('setToken',token)
    console.log(channel,action,args)
    const result = await actions[channel](action,args)
    console.log(result)
  }catch(err){
    console.log(err)
  }
  close()
})


