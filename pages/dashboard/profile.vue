<template>
  <v-container>
    <!-- begin: error -->
    <v-alert
      outlined
      type="error"
      v-for="(message,index) in errors"
      :key="index"
      dismissible
      ref="alert"
      transition="scale-transition"
      v-html="message"
    />
    <!-- end: error -->

    <!-- begin: success -->
    <v-snackbar v-model="okay" :timeout="1500" color="success" top>Perfil atualizado com sucesso.</v-snackbar>
    <!-- end: success -->
    <v-row>
      <v-col md="12">
        <v-card>
          <v-card-title primary-title>Meus dados</v-card-title>
          <v-container>
            <v-row class="mx-2">
              <v-col cols="6">
                <v-text-field
                  label="Nome completo"
                  placeholder="Fulano"
                  v-model="form.name"
                  @input="$v.form.name.$touch"
                  :error-messages="nameErrors"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Email"
                  placeholder="email@provedor.com"
                  v-model="form.email"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row class="mx-2">
              <v-col cols="6">
                <v-text-field
                  label="Senha"
                  placeholder="******"
                  type="password"
                  v-model="form.password"
                  @input="$v.form.password.$touch"
                  :error-messages="passswordErrors"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Repetir senha"
                  placeholder="******"
                  type="password"
                  v-model="form.password_confirmation"
                  @input="$v.form.password_confirmation.$touch"
                  :error-messages="passwordConfirmationErrors"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="cancel">Cancelar</v-btn>
            <v-btn
              @click="save(form)"
              :disabled="loading || $v.form.$invalid"
              color="primary"
            >Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { clone } from "lodash";
import { required, sameAs, helpers } from "vuelidate/lib/validators";

export default {
  layout: "app",

  middleware: "auth",

  data: () => ({
    okay: false,
    loading: false,
    errors: [],
    form: {
      name: null,
      email: null,
      password: null,
      password_confirmation: null
    }
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
    passswordErrors() {
      const rule = this.$v.form.password;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.regex && messages.push("a senha deve conter 6 digitos.");
      return messages;
    },
    passwordConfirmationErrors() {
      const rule = this.$v.form.password_confirmation;
      const messages = [];
      if (!rule.$dirty) return messages;
      !rule.sameAsPassword && messages.push("senha e re-senha não coincide.");
      return messages;
    },
    ...mapGetters({
      account: "user/account"
    })
  },

  validations() {
    const form = {
      name: {
        required,
        regex: value => /^[a-z-A-Z]{3,}/.test(value)
      },
      password: {},
      password_confirmation: {}
    };

    if (this.form.password) {
      Object.assign(form, {
        password: {
          regex: value => /^\d{6}$/.test(value)
        },
        password_confirmation: {
          sameAsPassword: sameAs("password")
        }
      });
    }

    return { form };
  },

  methods: {
    async save(form) {
      this.loading = true;
      try {
        const response = await this.$store.dispatch("user/update", form);

        this.okay = true;
      } catch (error) {
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
        // reset
        this.cancel();
        //
        this.loading = false;
      }
    },

    cancel() {
      this.form = clone(this.account);
      //
      this.$v.form.$reset();
    }
  },

  created() {
    this.form = clone(this.account);
  }
};
</script>

<style lang="scss" scoped>
</style>
