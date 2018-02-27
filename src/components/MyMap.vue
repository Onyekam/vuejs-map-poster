<template>
  <div class="right column">
    <!-- <h3>{{title}}</h3> -->
    <!-- <div class="mapbody"> -->
      <button @click="printPDF">Print PDF</button><button @click="printJPG">Print JPG</button>
      <div class="mapborder">
        <div class="map">
          <div class="textbox">
            <h1>{{country}}</h1>
            <h4>{{formatted_address}}</h4>
            <!-- <h6>{{center.lat}} / {{center.lng}}</h6> -->
          </div>
          <gmap-map :center="center" :zoom="10" id="mainMap" class="mainmap" style="height:100%;" :options="{styles: styles, disableDefaultUI: disableDefaultUI}" map-type-id="terrain">
            <!-- <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker> -->
          </gmap-map>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import geocoder from 'geocoder'
import domtoimage from 'dom-to-image'
import $ from 'jquery'
import jspdf from 'jspdf'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD6Fds4LSY9VYD-tfvo7ouniWnhWTtqDLM',
    libraries: 'places'
  }
})
Vue.use(geocoder, {
  load: {
    key: 'AIzaSyD6Fds4LSY9VYD-tfvo7ouniWnhWTtqDLM'
  }
})
var JsPDF = jspdf
Vue.use(JsPDF)
Vue.use(domtoimage)
export default {
  name: 'MyMap',
  created () {
    this.$eventBus.$on('search', ($event) => {
      this.country = $event
      var self = this
      geocoder.geocode(this.country, function (err, data, results, otherResults) {
        if (data) {
          for (let i = 0; i < data.results.length; i++) {
            console.dir(data.results[i].geometry.location.lat)
            results = data.results[i].geometry.location
            otherResults = data.results[i].formatted_address
            console.dir(results)
          }
          self.center.lat = results.lat
          self.center.lng = results.lng
          self.formatted_address = otherResults
        }
        if (err) {
          console.log('geocode error : ' + err)
        }
      })
      console.log('My event has been triggered', $event)
    })
  },
  methods: {
    printPDF: function () {
      $(document).ready(function () {
        var doc = new JsPDF()
        var element = $('.map').get(0)
        domtoimage.toPng(element).then(function (dataUrl) {
          var img = new Image()
          img.src = dataUrl
          doc.addImage(img, 'JPEG', 0, 0, 180, 180)
          doc.save('a1.pdf')
        }).catch(function (error) {
          console.error('oops, something went wrong!', error)
        })
      })
    },
    printJPG: function () {
      $(document).ready(function () {
        domtoimage.toJpeg(document.querySelector('.map'), { quality: 1 }).then(function (dataUrl) {
          var link = document.createElement('a')
          link.download = 'my-image-name.jpeg'
          link.href = dataUrl
          link.click()
        })
      })
    }
  },
  data () {
    return {
      country: '',
      formatted_address: '',
      title: 'Map',
      center: {
        lat: '',
        lng: ''
      },
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: ['terrain']
      },
      markers: [
        {
          position: {
            lat: 10.0,
            lng: 10.0
          }
        },
        {
          position: {
            lat: 11.0,
            lng: 11.0
          }
        }
      ],
      styles: [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [
            {saturation: '-100'},
            {lightness: '1'},
            {gamma: '1'}
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#434343'}, {weight: 0.5}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#090909'}, {weight: 0.6}]
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [{color: '#434343'}, {weight: 0.5}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{color: '#303030'}, {weight: 0.3}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#efefef'}]
        },
        {
          elementType: 'labels',
          stylers: [
            {visibility: 'off'}
          ]
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [
            {color: '#ffffff'}
          ]
        }
      ]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mapbody{
  background-color: #fff;
  width: 55%;
  margin: 0 auto;
  height: 90%;
}
.right{
  width: 75%;
  background-color: #efefef;
  color: #2c3e50;
  height: 100%;
  text-align: center;
}

.map{
  padding: 20px;
  width: 100%;
  height: 100%;
  position: relative;
  display: table;
  margin: 0 auto;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
}

.textbox{
  width: 90.5%;
  padding: 0px;
  margin-top:1px;
  margin-left:1px;
  position: absolute;
  display: table;
  z-index: 99;
  text-align: center;
  background: linear-gradient(to bottom, rgba(255,255,255,0.95) 30%,rgba(0,0,0,0) 60%);
  height: 70%;
}
.mainmap{
  border: #2c3e50 1px solid;
  width: 100% !important;
}
.mapborder{
  padding: 13px;
  width: 40%;
  height: 90%;
  margin: 0 auto;
  text-align: center;
}
h1 {
  text-transform: uppercase;
  margin-bottom: -25px;
  color: #434343;
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
