<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-list-item link to="/dashboard" absolute>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/profile" absolute>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Meus dados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.prevent="alert('export.')">
          <v-list-item-action>
            <v-icon>mdi-file-export</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Exportar eventos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">OW Interactive</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Buscar eventos"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-calendar-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="640px">
      <AddEvent @close="dialog = $event" />
    </v-dialog>
  </v-app>
</template>

<script>
import AddEvent from "@/components/Events/AddEvent";
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
  })
};
</script>
