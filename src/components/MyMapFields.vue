<template>
  <div class="left column">
    <h3>{{title}}</h3>
    <div class="search">
      <font-awesome-icon icon="search" class="icon"/>
      <input type="text" name="place" id="" class="input" placeholder="Enter a place" v-model="country">
      <button @click="findMap">search map</button>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'MyMapFields',
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      title: 'Create your map',
      country: ''
    }
  },
  methods: {
    findMap: function () {
      console.log('console says ' + this.country)
      this.$eventBus.$emit('search', this.country)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input{
  width: 75%;
  height: 2.5em;
  margin-top: 15px;
}
.search { position: relative; }
.search input { text-indent: 30px;}
.search .icon {
  position: absolute;
  top: 24px;
  right: 45px;
  font-size: 15px;
  color:#2c3e50;
}
.left{
  width: 25%;
  background-color: #2c3e50;
  color: #efefef;
  height: 100%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
