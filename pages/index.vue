<template>
  <div>
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

    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Área Restrita</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label="E-mail"
            type="email"
            :rules="[rules.email]"
            placeholder="contato@provedor.com"
            v-model="credentials.email"
          />
          <v-text-field
            id="password"
            label="Senha"
            type="password"
            placeholder="******"
            :rules="[rules.required, rules.password]"
            v-model="credentials.password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text to="/password/forgot">Esqueceu a senha?</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          @click="send(credentials)"
          :loading="loading"
          :disabled="loading"
        >Acessar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { email } from "vuelidate/lib/validators";

export default {
  data: () => ({
    credentials: {
      email: null,
      password: null
    },

    rules: {
      required: value => !!value || "Um valor é obrigatório.",
      email: value => email(value) || "Informe um email válido.",
      password: value =>
        new RegExp(/^\d{6}$/).test(value) || "A senha requer 6 digitos."
    },

    errors: [],

    loading: false
  }),

  methods: {
    /**
     * @param {*} credentials
     */
    async send(credentials) {
      this.loading = true;

      try {
        const response = await this.$store.dispatch("user/login", credentials);
        //
        this.route.to("/dashboard");
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
