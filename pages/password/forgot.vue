<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Esqueceu a senha?</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field label="E-mail" type="email" placeholder="contato@provedor.com" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text to="/">Voltar</v-btn>
      <v-spacer />
      <v-btn color="primary" to="/password/reset/1">Enviar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {}
};
</script>
