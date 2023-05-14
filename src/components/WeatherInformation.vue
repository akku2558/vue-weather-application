<template>
<!-- information table  -->
  <div class="table">
    <table class="table-content" v-if="city">
        <tr class="cityName">{{this.city}}, {{weatherData.country}}</tr>
        <tr class="row">
          <td class="label">Temperature</td>
          <td class="info">{{weatherData.temperature}} <Icon icon="mdi:temperature-celsius" /></td>
        </tr>
        <tr class="row">
          <td class="label">Humidity</td>
          <td class="info">{{weatherData.humidity}}</td>
        </tr>
        <tr class="row">
          <td class="label">Weather</td>
          <td class="info">{{weatherData.weatherCondition}}</td>
        </tr>
        <tr class="row">
          <td class="label">Wind Speed</td>
          <td class="info">{{weatherData.windSpeed}}m/s</td>
           </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon } from '@iconify/vue2';
export default {
    name: 'WeatherInformation',
    components: {
		Icon,
	},
    props: ['city'],
    data(){
        return{
            weatherData: {}
        }
    },
    computed: {
        ...mapGetters(['weather'])
    },
    mounted(){
      //to display the data 
        if(this.city != null || this.city != undefined){
            this.weatherData = this.weather[this.city.toLowerCase()]
        }
    },

}
</script>

<style  scoped>
.table{
    display: contents;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
    height: 20em;
}
table{
  display: contents;
  border-collapse: collapse;
}
tr{
  display: flex;
  flex-direction: row;
}

.cityName{
    font-size: 2rem;
    font-weight: 600;
    padding: 1rem;
    border-bottom: 2px solid black;
}
.row{
  
    font-size: 2rem;
    font-weight: 400;
}
.label{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 10px;
}
.info{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: 10px;
}

</style>
