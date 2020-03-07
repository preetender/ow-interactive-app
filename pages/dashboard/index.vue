<template>
  <v-container>
    <v-row>
      <v-col md="4" v-for="(event, index) in events" :key="index">
        <card :event="event" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "@/components/events/Card";
export default {
  layout: "app",

  components: {
    Card
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapGetters({
      events: "events/all"
    })
  },

  methods: {
    ...mapActions({
      find: "events/find"
    })
  },

  async mounted() {
    // carregar eventos
    await this.find();
  }

  // async asyncData({ $axios, store }) {
  //   // login
  //   $axios.setToken(store.getters["user/token"], "Bearer");

  //   const data = await $axios.$get("api/events");
  //   //
  //   store.commit("events/set", data);
  // }
};
</script>

<style lang="scss" scoped>
</style>
