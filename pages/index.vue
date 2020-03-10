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
            placeholder="contato@provedor.com"
            v-model="credentials.email"
            @input="$v.credentials.email.$touch"
          />
          <v-text-field
            id="password"
            label="Senha"
            type="password"
            placeholder="******"
            v-model="credentials.password"
            @input="$v.credentials.password.$touch"
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
          :disabled="loading || $v.credentials.$invalid"
        >Acessar</v-btn>
      </v-card-actions>
    </v-card>
    <p class="text-center mt-4">
      <v-btn text to="/register">Faça seu cadastro</v-btn>
    </p>
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";

export default {
  props: {
    emailCreated: String
  },
  data: () => ({
    credentials: {
      email: null,
      password: null
    },
    errors: [],
    loading: false
  }),

  computed: {
    emailErrors() {
      const rule = this.$v.form.email;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.required && messages.push("o e-mail é requerido.");
      !rule.email && messages.push("informe um endereço válido.");
      return messages;
    },
    passwordErrors() {
      const rule = this.$v.form.password;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.required && messages.push("a senha é requerido.");
      !rule.equal && messages.push("a senha deve conter 6 digitos.");
      return messages;
    }
  },

  validations: {
    credentials: {
      email: {
        required,
        email
      },
      password: {
        required,
        regex: value => /^\d{6}$/.test(value)
      }
    }
  },

  methods: {
    /**
     * @param {*} form
     */
    async send(form) {
      this.loading = true;

      try {
        const response = await this.$store.dispatch("user/login", form);
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
