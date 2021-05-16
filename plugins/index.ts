import { FastifyPluginCallback, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

// using declaration merging, add your plugin props to the appropriate fastify interfaces
declare module 'fastify' {
  interface FastifyRequest {
    myPluginProp: string
  }
  interface FastifyReply {
    myPluginProp: number
  }
}

// define options
export interface MyPluginOptions {
  myPluginOption: string
}

// define plugin using callbacks
const myPluginCallback: FastifyPluginCallback<MyPluginOptions> = (fastify, options, done) => {
  fastify.decorateRequest('myPluginProp', 'super_secret_value')
  fastify.decorateReply('myPluginProp', options.myPluginOption)

  done()
}

// define plugin using promises
const myPluginAsync: FastifyPluginAsync<MyPluginOptions> = async (fastify, options) => {
  fastify.decorateRequest('myPluginProp', 'super_secret_value')
  fastify.decorateReply('myPluginProp', options.myPluginOption)
}

// export plugin using fastify-plugin
export default fp(myPluginCallback, '3.x')
// or
// export default fp(myPluginAsync, '3.x')
