const test = require('tape')
const utils = require('./utils')
const proxy = require('./proxy')
const iter = require('./iterate')
const lodash = require('lodash')

test('utils',t=>{
  const path = ['this','is','a','very','deep','path',0]
  // t.test('setProxy',t=>{
  //   const obj = {}
  //   console.time('setProxy')
  //   proxy.set(obj,path,'test')
  //   console.timeEnd('setProxy')
  //   t.equal(obj.this.is.a.very.deep.path[0],'test')
  //   t.end()
  // })
  t.test('setIter',t=>{
    const obj = {}
    console.time('setIter')
    iter.set(obj,path,'test')
    console.timeEnd('setIter')
    t.equal(obj.this.is.a.very.deep.path[0],'test')
    t.end()
  })
  t.test('lodash.set',t=>{
    const obj = {}
    console.time('setlodash')
    lodash.set(obj,path,'test')
    console.timeEnd('setlodash')
    t.equal(obj.this.is.a.very.deep.path[0],'test')
    t.end()
  })
  t.test('set recurse',t=>{
    const obj = {}
    console.time('set recurse')
    utils.set(obj,path,'test')
    console.timeEnd('set recurse')
    t.equal(obj.this.is.a.very.deep.path[0],'test')
    t.end()
  })
  // t.test('get',t=>{
  //   console.time('get')
  //   const result = utils.get(obj,path)
  //   console.timeEnd('get')
  //   t.equal(result,'test')
  //   t.end()
  // })
  // t.test('getProxy',t=>{
  //   console.time('getProxy')
  //   const result = proxy().get(obj,path)
  //   console.timeEnd('getProxy')
  //   t.equal(result,'test')
  //   t.end()
  // })
  // t.test('get default',t=>{
  //   const result = utils.get(obj,['dne'],'ok')
  //   t.equal(result,'ok')
  //   t.end()
  // })
  // t.test('unset',t=>{
  //   console.time('unset')
  //   utils.unset(obj,path)
  //   console.timeEnd('unset')
  //   t.notOk(utils.get(obj,path))
  //   t.end()
  // })
  // t.test('unset Proxy',t=>{
  //   console.time('unset proxy')
  //   proxy().unset(obj,path)
  //   console.timeEnd('unset proxy')
  //   t.notOk(utils.get(obj,path))
  //   t.end()
  // })
})
