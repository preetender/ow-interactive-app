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

  middleware: "auth",

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
};
</script>

<style lang="scss" scoped>
</style>
