<template>
  <v-container>
    <v-row>
      <v-col md="12">
        <v-card>
          <v-card-title primary-title>Meus dados</v-card-title>
          <v-container>
            <v-row class="mx-2">
              <v-col cols="6">
                <v-text-field label="Nome completo" placeholder="Fulano" />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Email" placeholder="email@provedor.com" />
              </v-col>
            </v-row>
            <v-row class="mx-2">
              <v-col cols="6">
                <v-text-field label="Senha" placeholder="******" type="password" />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Repetir senha" placeholder="******" type="password" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="$emit('close')">Cancelar</v-btn>
            <v-btn @click="$emit('close')" color="primary">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "app"
};
</script>

<style lang="scss" scoped>
</style>
