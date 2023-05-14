<template>
  <div class="main">
    <div class="card">
      <h1>Weather Forecast</h1>
      <!-- drop down list  -->
      <v-select
        name="city"
        class="select-city"
        label="cityName"
        placeholder="Select City"
        @input="getResult()"
        :options="cityList"
        v-model="city"
        :clearable="false"
      />
    </div>
    <Transition name="slide-fade">
      <!-- if response is successful -->
      <div class="card" v-if="showInfo">
        <WeatherInformation :city="city.cityCode" />
      </div>
      <!-- else request failed -->
        <div class="card" v-if="showError">
            <h1>Unable to fetch data. Please try again later!</h1>
        </div>
    </Transition>

  </div>
</template>

<script>
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import WeatherInformation from "./WeatherInformation.vue";

export default {
  /* eslint-disable */
  name: "Home",
  components: {
    "v-select": vSelect,
    WeatherInformation,
  },
  data() {
    return {
      city: null,
      cityList: [
        { cityName: "Mumbai", cityCode: "MUMBAI" },
        { cityName: "Hyderabad", cityCode: "HYDERABAD" },
        { cityName: "Delhi", cityCode: "DELHI" },
        { cityName: "Bangalore", cityCode: "BANGALORE" },
      ],
      showInfo: false,
      showError: false
    };
  },
  async mounted() {},
  methods: {
    //fetching response from API => openweathermap.org
    async getResult() {
      this.showInfo = false;
      this.showError = false;
       await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + 
       this.city.cityCode + "&units=metric&appid=bc70d5417efaaa284b12246ec93f40a7"
       //if response is sucessful
      ).then((result) =>{
        if (result.status == "200") {
        let weatherData = {
          cityName: this.city.cityCode.toLowerCase(),
          country: result.data.sys.country,
          temperature: result.data.main.temp,
          weatherCondition: result.data.weather[0].main,
          windSpeed: result.data.wind.speed,
          humidity: result.data.main.humidity
        };
        //save the data into the store
        this.$store.dispatch("updateWeather", weatherData);
        this.showInfo = true;
      }
      })
      //if response is not successful
      .catch(() => {
        this.showError = true;

      })
    },
  },
};
</script>

<style>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.card {
    display: flex;
    flex-direction: column;
    background-color: white;
    background-image: linear-gradient(
    to bottom right,
    lightblue,
    lightgray 55%,
    rgb(239, 239, 130) 98%
  );
  border-radius: 1rem;
  box-shadow: 5px 5px #555353;
    width: 35%;
    height: 30%;
    margin: 1rem;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
}
.select-city {
  width: 40%;
}
.weather-info {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
}
.slide-fade-enter-active {
  transition: all 1s fade-in;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
    transform: translateY(-100px);
    opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>