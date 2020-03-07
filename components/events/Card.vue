<template>
  <v-card class="mx-auto">
    <v-card-title>Nome do evento</v-card-title>
    <v-card-subtitle>00/00/0000 as 00:00</v-card-subtitle>
    <v-card-text>Descrição</v-card-text>
    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip>usuario</v-chip>
        <v-chip>usuario</v-chip>
        <v-chip>usuario</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="remover">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="edit = !edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>

    <v-dialog v-model="edit" width="640px">
      <edit-event @close="edit = $event" v-model="event" />
    </v-dialog>
  </v-card>
</template>

<script>
import EditEvent from "@/components/events/Form";

export default {
  props: {
    event: Object
  },

  components: {
    EditEvent
  },

  data: () => ({
    edit: false
  }),

  methods: {
    remover() {
      alert("remover");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
