<template>
  <div id="reset-password">
    <v-alert
      dense
      outlined
      type="error"
      v-for="(message,index) in errors"
      :key="index"
      dismissible
      ref="alert"
      icon="mdi-alert"
      transition="scale-transition"
      v-html="message"
    />

    <!-- begin: success -->
    <v-snackbar v-model="okay" :timeout="1500" color="success" top dark>Senha alterada com sucesso!</v-snackbar>
    <!-- end: success -->

    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Redefinir senha</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-if="!failed">
        <v-text-field
          label="Senha"
          type="password"
          placeholder="******"
          v-model="form.password"
          @input="$v.form.password.$touch"
          :error-messages="passwordErrors"
        />
        <v-text-field
          label="Repetir Senha"
          type="password"
          placeholder="******"
          v-model="form.password_confirmation"
          @input="$v.form.password_confirmation.$touch"
          :error-messages="passwordConfirmationErrors"
        />
      </v-card-text>
      <v-card-text v-else>
        <p>Não conseguimos verificar o token da requisição.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text to="/">Logar</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          @click="send(form)"
          :loading="loading"
          :disabled="loading || $v.form.$invalid"
        >Alterar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  data: () => ({
    errors: [],
    loading: false,
    okay: false,
    form: {
      password: null,
      password_confirmation: null,
      email: null,
      token: null
    },
    failed: false
  }),

  computed: {
    passwordErrors() {
      const rule = this.$v.form.password;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.required && messages.push("a senha é requerida.");
      !rule.equal && messages.push("a senha deve conter 6 digitos.");
      return messages;
    },
    passwordConfirmationErrors() {
      const rule = this.$v.form.password_confirmation;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.sameAsPassword && messages.push("senha e re-senha não coincide.");
      return messages;
    }
  },

  validations: {
    form: {
      password: {
        required,
        equal: value => /^\d{6}$/.test(value)
      },
      password_confirmation: {
        sameAsPassword: sameAs("password")
      }
    }
  },

  methods: {
    /**
     * Verificar se token é valido.
     */
    async verify() {
      const { token } = this.$route.params;
      try {
        const response = await this.$axios.get(
          `api/utils/verify_token?token=${token}`
        );
        const { data } = response;
        this.form.email = data.email;
        this.form.token = token;
      } catch (error) {
        this.failed = true;
      }
    },

    async send(form) {
      try {
        const response = this.$axios.post("api/password/change", form);
        this.okay = true;
        // ir para login
        setTimeout(() => this.$router.push("/"), 2000);
      } catch (e) {
        console.log(e);
        if (!e.hasOwnProperty("errors")) {
          this.errors.push("falhou! problema interno.");
        } else {
          this.errors = e.errors;
        }

        setTimeout(e => {
          // ocultar
          this.$refs.alert.forEach(h => h.toggle());
        }, 2000);
      }
    }
  },

  async mounted() {
    await this.verify();
  }
};
</script>
