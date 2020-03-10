<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Redefinir senha</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
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
      </v-form>
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
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  data: () => ({
    loading: false,
    form: {
      password: null,
      password_confirmation: null
    }
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
    send(form) {
      const { token } = this.$route.params;
      //
      console.log(form, token);
    }
  }
};
</script>
