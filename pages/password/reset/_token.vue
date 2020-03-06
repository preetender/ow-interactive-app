<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Redefinir</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field label="Senha" type="password" placeholder="******" />
        <v-text-field label="Repetir Senha" type="password" placeholder="******" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text to="/">Logar</v-btn>
      <v-spacer />
      <v-btn color="primary">Alterar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {}
};
</script>
