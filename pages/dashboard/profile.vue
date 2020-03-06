<template>
  <v-container fluid justify-center>
    <v-row>
      <v-col md="6">
        <v-card>
          <v-card-title>Adicionar Evento</v-card-title>
          <v-container>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-text-field label="Titulo" placeholder="Meu evento" />
              </v-col>
              <v-col cols="12">
                <v-textarea label="Descrição" placeholder="Detalhes do evento" rows="5"></v-textarea>
              </v-col>
              <v-col cols="12">#chips</v-col>
              <v-col cols="6">
                <v-text-field type="datetime" label="Data de inicio" />
              </v-col>
              <v-col cols="6">
                <v-text-field type="datetime" label="Data de término" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="$emit('close')">Cancelar</v-btn>
            <v-btn @click="$emit('close')">salvar</v-btn>
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
