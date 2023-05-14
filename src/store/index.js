import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weather: {
      mumbai: {
      },
      hyderabad: {
      },
      delhi: {
      },
      bangalore: {
      },
    },
  },
  mutations: {
    updateWeatherInfo(state, payload) {
      state.weather[payload.cityName] = {
        ...payload,
      };
    },
  },

  actions: {
    updateWeather: (store, payload) => {
      store.commit("updateWeatherInfo", payload);
    },
  },
  getters: {
    mumbai: (state) => state.weather.mumbai,
    hyderabad: (state) => state.weather.hyderabad,
    delhi: (state) => state.weather.delhi,
    bangalore: (state) => state.weather.bangalore,
    weather: (state) => state.weather,
  },
});
