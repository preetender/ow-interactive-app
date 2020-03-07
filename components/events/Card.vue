<template>
  <v-card>
    <v-card-title>{{ event.title }}</v-card-title>
    <v-card-text>
      <p class="text--primary">Data inicio • {{ event.dates.start_at }}</p>
      <v-divider></v-divider>
      <div class="my-2" v-html="description"></div>
    </v-card-text>
    <v-card-text>
      <v-chip-group active-class="primary white--text" column>
        <v-chip>usuario</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="forget(event.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="edit = !edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>

    <v-dialog v-model="edit" width="640px">
      <edit-event @close="edit = $event" v-model="event" @save="eventUpdate" />
    </v-dialog>
  </v-card>
</template>

<script>
import EditEvent from "@/components/events/Form";
import { mapActions } from "vuex";

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

  computed: {
    description() {
      const { description } = this.event;
      return description ? description : "<i>Nenhuma descrição disponível.</i>";
    }
  },
  methods: {
    /**
     * @param {*} form
     */
    async eventUpdate(form) {
      try {
        const { start_at, end_at, title, description, id, users } = form;
        const data = {
          start_at,
          end_at,
          title,
          description,
          users,
          id
        };
        await this.update(data);
        //
        this.edit = false;
      } catch (error) {
        console.warn(error);
      }
    },
    ...mapActions({
      forget: "events/destroy",
      update: "events/update"
    })
  }
};
</script>

<style lang="scss" scoped>
</style>
