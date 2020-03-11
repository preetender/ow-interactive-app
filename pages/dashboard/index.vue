<template>
  <v-container>
    <v-toolbar elevation="1">
      <v-select
        v-model="filter"
        :items="filters"
        item-text="label"
        item-value="value"
        hide-details
      />
      <v-divider vertical class="mx-2"></v-divider>
      <v-select :items="pages" placeholder="total por página" v-model="perPage" hide-details></v-select>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-pagination v-model="page" :length="totalPages" v-if="totalPages > 0" circle></v-pagination>
      </div>
    </v-toolbar>
    <v-fade-transition>
      <v-row v-if="events.length > 0" key="exists">
        <v-scroll-x-transition group tag="div" class="flex row mx-1">
          <v-col md="4" v-for="(event, index) in events" :key="index">
            <card :event="event" />
          </v-col>
        </v-scroll-x-transition>
      </v-row>
      <v-row key="empty" v-else>
        <v-col md="12">
          <v-alert
            color="info"
            dark
            icon="mdi-calendar"
            dense
          >Você não possui nenhum evento para esse periodo.</v-alert>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "@/components/events/Card";
export default {
  layout: "app",

  middleware: "auth",

  components: {
    Card
  },

  data: () => ({
    page: 1,
    filter: "Today",
    pages: [5, 10, 25, 50],
    filters: [
      { value: "Today", label: "Hoje" },
      { value: "NextFiveDays", label: "Próximos cinco dias" },
      { value: "all", label: "Todos" }
    ],
    perPage: 10
  }),

  computed: {
    totalPages() {
      return Math.ceil(this.meta.total / this.meta.per_page);
    },
    ...mapGetters({
      events: "events/all",
      meta: "events/meta"
    })
  },

  watch: {
    async filter(value) {
      this.page = 1;
      await this.filtered();
    },
    async perPage(value) {
      this.page = 1;
      await this.filtered();
    }
  },

  methods: {
    async filtered() {
      const query = {};
      query.filter = this.filter;
      query.paginate = this.perPage;
      query.page = this.page;
      //
      await this.find(query);
    },

    ...mapActions({
      find: "events/find"
    })
  },

  async mounted() {
    // carregar eventos
    await this.find();
  }
};
</script>

<style lang="scss" scoped>
</style>
