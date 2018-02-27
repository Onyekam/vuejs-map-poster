import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyMapFields from '@/components/MyMapFields'
import MyMap from '@/components/MyMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        default: HelloWorld,
        a: MyMapFields,
        b: MyMap
      }
    }
  ]
})
