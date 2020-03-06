<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Área Restrita</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field label="E-mail" type="email" placeholder="contato@provedor.com" />
        <v-text-field id="password" label="Senha" type="password" placeholder="******" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text to="/password/forgot">Esqueceu a senha?</v-btn>
      <v-spacer />
      <v-btn color="primary">Acessar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>
