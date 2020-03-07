<template>
  <v-container>
    <v-row>
      <v-col md="4">
        <card :event="{a: 1}" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/events/Card";
export default {
  layout: "app",

  components: {
    Card
  }
};
</script>

<style lang="scss" scoped>
</style>
