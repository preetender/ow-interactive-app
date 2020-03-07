<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Esqueceu a senha?</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="E-mail"
          type="email"
          placeholder="contato@provedor.com"
          v-model="form.email"
          :rules="[rules.required, rules.email]"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text to="/">Voltar</v-btn>
      <v-spacer />
      <!-- to="/password/reset/1" -->
      <v-btn color="primary" @click="send" :loading="loading">Enviar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { email } from "vuelidate/lib/validators";
export default {
  data: () => ({
    form: {
      email: null
    },
    rules: {
      required: value => !!value || "informe o e-mail.",
      email: value => email(value) || "informe um endereço válido."
    },
    loading: false
  }),

  methods: {
    send(form) {
      this.loading = true;

      try {
        // const response = await this.$store.dispatch("user/login", credentials);
        alert("ok");
      } catch (e) {
        console.warn(e);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
