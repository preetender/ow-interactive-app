<template>
  <div id="forgot">
    <v-alert
      dense
      outlined
      type="error"
      v-for="(message,index) in errors"
      :key="index"
      dismissible
      ref="alert"
      transition="scale-transition"
    >{{ message }}</v-alert>

    <!-- begin: success -->
    <v-snackbar
      v-model="okay"
      :timeout="1500"
      color="success"
      top
      dark
    >Um e-mail foi enviado contendo instruções.</v-snackbar>
    <!-- end: success -->

    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Esqueceu a senha?</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          label="E-mail"
          type="email"
          placeholder="contato@provedor.com"
          v-model="form.email"
          @input="$v.form.email.$touch"
          :error-messages="emailErrors"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text to="/">Voltar</v-btn>
        <v-spacer />
        <!-- to="/password/reset/1" -->
        <v-btn
          color="primary"
          @click="send(form)"
          :loading="loading"
          :disabled="loading || $v.form.$invalid"
        >Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    loading: false,
    okay: false,
    form: {
      email: null
    },
    errors: []
  }),

  computed: {
    emailErrors() {
      const rule = this.$v.form.email;
      const messages = [];

      if (!rule.$dirty) return messages;

      !rule.required && messages.push("o e-mail é requerido.");

      !rule.email && messages.push("informe um endereço válido.");

      return messages;
    }
  },

  watch: {
    "form.email"(value) {
      if (!value.length) {
        this.$v.form.email.$reset();
      }
    }
  },

  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },

  methods: {
    async send(form) {
      this.loading = true;

      try {
        const response = await this.$axios.post("api/password/send", form);
        //
        this.okay = true;
        // ir para login
        setTimeout(() => this.$router.push("/"), 2000);
      } catch (e) {
        if (!e.hasOwnProperty("errors")) {
          this.errors.push("falhou! problema interno.");
        } else {
          this.errors = e.errors;
        }

        setTimeout(e => {
          // ocultar
          this.$refs.alert.forEach(h => h.toggle());
        }, 2000);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
