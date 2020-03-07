<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-container>
      <v-row class="mx-2">
        <v-col cols="12">
          <v-text-field label="Titulo" placeholder="Meu evento" />
        </v-col>

        <v-col cols="6">
          <v-text-field
            label="Data de término"
            v-mask="'##/##/#### ##:##'"
            v-model="form.start_at"
          />
        </v-col>

        <v-col cols="6">
          <!-- mask="##/##/#### ##:##" -->
          <v-text-field label="Data de término" v-mask="'##/##/#### ##:##'" v-model="form.end_at" />
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            label="Usuários"
            chips
            dense
            small-chips
            :items="items"
            item-value="id"
            item-text="name"
            v-model="form.users"
            multiple
          />
        </v-col>

        <v-col cols="12">
          <v-textarea label="Descrição" placeholder="Detalhes do evento" rows="1"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-spacer />
      <v-btn text color="primary" @click="cancel">Cancelar</v-btn>
      <v-btn @click="save(form)" color="primary">Salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        title: null,
        description: null,
        start_at: null,
        end_at: null,
        users: []
      })
    },
    incrementing: {
      type: Boolean,
      default: false
    }
  },

  directives: {
    mask
  },

  data: () => ({
    form: {},
    items: [
      {
        id: 1,
        name: "Usuario"
      },
      {
        id: 2,
        name: "Fulano"
      }
    ]
  }),

  computed: {
    title() {
      return this.incrementing ? "Novo Evento" : "Editar Evento";
    }
  },

  methods: {
    save(form) {
      this.$emit("save", form);
    },

    cancel() {
      this.form = Object.assign({}, this.value);
      //
      this.$emit("close");
    }
  },

  mounted() {
    this.form = Object.assign({}, this.value);
  }
};
</script>

<style lang="scss" scoped>
</style>
