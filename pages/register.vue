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
      v-html="message"
    />

    <!-- begin: success -->
    <v-snackbar v-model="okay" :timeout="1500" color="success" top dark>
      Cadastro realizado com sucesso.
      <v-btn color="primary" text @click="okay = false">ok</v-btn>
    </v-snackbar>
    <!-- end: success -->

    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Cadastre-se</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Nome completo"
            placeholder="Fulano"
            v-model="form.name"
            @input="$v.form.name.$touch"
            :error-messages="nameErrors"
          />
          <v-text-field
            label="E-mail"
            type="email"
            placeholder="contato@provedor.com"
            v-model="form.email"
            @input="$v.form.email.$touch"
            :error-messages="emailErrors"
          />
          <v-text-field
            id="password"
            label="Senha"
            type="password"
            placeholder="******"
            v-model="form.password"
            @input="$v.form.password.$touch"
            :error-messages="passswordErrors"
          />
          <v-text-field
            id="password_confirmation"
            label="Repetir senha"
            type="password"
            placeholder="******"
            v-model="form.password_confirmation"
            @input="$v.form.password_confirmation.$touch"
            :error-messages="passwordConfirmationErrors"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text to="/password/forgot">Esqueceu a senha?</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          @click="send(form)"
          :loading="loading"
          :disabled="loading || $v.form.$invalid"
        >Acessar</v-btn>
      </v-card-actions>
    </v-card>
    <p class="text-center mt-4">
      <v-btn text to="/">Login</v-btn>
    </p>
  </div>
</template>

<script>
import { email, required, sameAs } from "vuelidate/lib/validators";

export default {
  data: () => ({
    form: {
      name: null,
      email: null,
      password: null,
      password_confirmation: null
    },
    errors: [],
    loading: false,
    okay: false
  }),

  computed: {
    nameErrors() {
      const rule = this.$v.form.name;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.required && messages.push("o nome é requerido.");
      !rule.regex && messages.push("informe um nome válido.");
      return messages;
    },
    emailErrors() {
      const rule = this.$v.form.email;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.required && messages.push("o e-mail é requerido.");
      !rule.email && messages.push("informe um endereço válido.");
      return messages;
    },
    passswordErrors() {
      const rule = this.$v.form.password;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.required && messages.push("a senha é requerido.");
      !rule.regex && messages.push("a senha deve conter 6 digitos.");
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
      name: {
        required,
        regex: value => /^[a-z-A-Z]{3,}/.test(value)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        regex: value => /^\d{6}$/.test(value)
      },
      password_confirmation: {
        sameAsPassword: sameAs("password")
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
        const response = await this.$axios.post("register", form);

        this.okay = true;

        setTimeout(() => this.$router.push("/"), 2000);
        // this.$router.push("/dashboard");
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
