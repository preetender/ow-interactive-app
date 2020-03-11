<template>
  <v-card dense>
    <v-toolbar prominent elevation="0" color="primary" dark>
      <v-toolbar-title>{{ event.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user_id === parseInt(event.user_id)">
        <v-btn icon @click="forget(event.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="edit = !edit">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <p class="text--primary">Data inicio • {{ event.dates.start_at }}</p>
      <p class="text--primary">Data encerramento • {{ event.dates.end_at }}</p>
      <div class="my-2" v-html="description"></div>
    </v-card-text>
    <div class="ma-2" v-if="event.users.length > 0">
      <v-subheader class="px-1">Convidados</v-subheader>
      <v-chip-group active-class="primary white--text" column>
        <v-chip
          small
          v-for="(user,index) in event.users"
          :key="index"
          :color="user.pivot.confirmed == 1 ? 'success' : 'grey'"
        >{{ user_id === user.id ? 'você' : user.name }}</v-chip>
      </v-chip-group>
    </div>
    <!-- begin: modal -->
    <v-dialog v-model="edit" width="640px">
      <edit-event @close="edit = $event" v-model="event" @save="eventUpdate" />
    </v-dialog>
    <!-- end: modal -->
  </v-card>
</template>

<script>
import EditEvent from "@/components/events/Form";
import { mapActions, mapGetters } from "vuex";

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
    },

    ...mapGetters({ user_id: "user/id" })
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
