<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-container>
      <v-row class="mx-2">
        <v-col cols="12">
          <v-text-field
            label="Titulo"
            placeholder="Meu evento"
            v-model="form.title"
            @input="$v.form.title.$touch"
            :error-messages="titleErrors"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            label="Data de inicio"
            type="datetime-local"
            v-model="form.start_at"
            @focusout="$v.form.start_at.$touch"
            :error-messages="startAtErrors"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            label="Data de término"
            v-model="form.end_at"
            type="datetime-local"
            @focusout="$v.form.end_at.$touch"
          />
        </v-col>

        <v-col cols="12">
          <v-autocomplete
            label="Usuários"
            placeholder="selecionar convidados."
            chips
            dense
            small-chips
            :items="users"
            item-value="id"
            item-text="name"
            v-model="form.users"
            multiple
          />
        </v-col>

        <v-col cols="12">
          <v-textarea
            label="Descrição"
            placeholder="Detalhes do evento"
            rows="2"
            v-model="form.description"
            counter
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-spacer />
      <v-btn text color="primary" @click="cancel">Cancelar</v-btn>
      <v-btn
        @click="save(form)"
        color="primary"
        :loading="loading"
        :disabled="loading || $v.form.$invalid"
      >Salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { clone } from "lodash";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
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

  data: () => ({
    loading: false,
    form: {}
  }),

  computed: {
    title() {
      return this.incrementing ? "Novo Evento" : "Editar Evento";
    },
    titleErrors() {
      const rule = this.$v.form.title;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.required && messages.push("um titulo é requerido.");
      return messages;
    },
    startAtErrors() {
      const rule = this.$v.form.start_at;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.required && messages.push("informe a data de inicio");
      !rule.date && messages.push("informe dia/mes/ano hora:minuto");
      return messages;
    },
    endAtErrors() {
      const rule = this.$v.form.end_at;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.required && messages.push("informe a data de inicio");
      !rule.date && messages.push("informe dia/mes/ano hora:minuto");
      return messages;
    },
    ...mapGetters({ token: "user/token", users: "formSelectUser" })
  },

  validations() {
    const form = {
      title: { required },
      start_at: {
        required,
        date: value => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)
      },
      end_at: {
        required,
        date: value => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)
      }
    };

    return { form };
  },

  methods: {
    save(form) {
      const prepare = clone(form);

      if (this.incrementing) {
        // ajustar array
        prepare.users = form.users.map(h => h.id);
      }

      this.$emit("save", prepare);
    },

    cancel() {
      // copiar
      this.form = clone(this.value);
      // fechar
      this.$emit("close");
    }
  },

  created() {
    // copiar objeto
    this.form = clone(this.value);
  }
};
</script>

<style lang="scss" scoped>
</style>
