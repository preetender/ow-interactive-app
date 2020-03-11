<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-list-item link to="/dashboard" exact nuxt>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/profile" exact nuxt>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Meus dados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.prevent="exportToCsv">
          <v-list-item-action>
            <v-icon>mdi-file-export</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Exportar eventos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">OW Interactive</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-btn bottom dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-calendar-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="640px">
      <add-event @close="dialog = $event" incrementing @save="insertEvent" />
    </v-dialog>
  </v-app>
</template>

<script>
import AddEvent from "@/components/events/Form";
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    source: String
  },

  components: {
    AddEvent
  },

  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-home", text: "Inicio", to: "/dashboard" },
      { icon: "mdi-account", text: "Configurações", to: "/dashboard/profile" },
      { icon: "mdi-file-export", text: "Exportar" }
    ]
  }),

  computed: {
    ...mapGetters({
      token: "user/token"
    })
  },

  methods: {
    exportToCsv() {
      let ref = document.createElement("a");
      ref.href = "http://ow-interactive.local/api/export?token=" + this.token;
      ref.download = true;

      ref.click();
    },

    async insertEvent(form) {
      try {
        //
        await this.add(form);
        //
        this.dialog = false;
      } catch (error) {
        console.warn(error);
      }
    },
    ...mapActions({
      add: "events/create",
      logout: "user/logout",
      loadUsers: "findUsers"
    })
  },

  async mounted() {
    //
    await this.loadUsers();
  }
};
</script>
