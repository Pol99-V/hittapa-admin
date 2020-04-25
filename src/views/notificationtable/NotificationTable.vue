<template>
  <v-app id="inspire">

    <!--<v-container style="height: 200px;" v-show="!isloading">
      <v-row
        class="fill-height"
        align-content="bottom"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center"
          cols="12"
        >
          Loading users...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>-->

    <v-data-table
      :footer-props="{
        'items-per-page-options': [10],
      }"
      :headers="headers"
      :hide-default-footer="true"
      :items="notificationData"
      :items-per-page="10"
      :loading="isLoading"
      class="elevation-1"
      sort-by="id"
    >

      <template v-slot:item.id="{ item }">
        <v-chip>
          {{notificationData.map(function(x) {return x.id; }).indexOf(item.id) + 1 + (page - 1) * 10}}
        </v-chip>
      </template>

      <template v-slot:top>
        <v-toolbar color="white" flat>
          <v-toolbar-title>List Notifications</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog max-width="500px" v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn class="mb-2" color="primary" dark v-on="on">New Notification</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field label="Title" v-model="editedItem.title"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12" sm="12">
                      <v-textarea
                        background-color="grey lighten-2"
                        label="Body"
                        rows="3"
                        v-model="editedItem.body"
                      ></v-textarea>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close" color="blue darken-1" text>Cancel</v-btn>
                <v-btn @click="save" color="blue darken-1" text>Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          @click="duplicateItem(item)"
          color="primary"
        >Duplicate
        </v-btn>
        &nbsp;&nbsp;&nbsp;
        <v-btn
          @click="deleteItem(item)"
          color="error"
        >Delete
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn @click="initialize" color="primary">Reset</v-btn>
      </template>
    </v-data-table>

    <v-pagination
      :length="getTotalNotification"
      :total-visible="7"
      @input="onPageChange(page)"
      @next="onNextPage(page)"
      @previous="onPrevPage(page)"
      circle
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
      v-model="page"
    ></v-pagination>

  </v-app>
</template>

<script>
  export default {
    name: "NotificationTable",
    data: () => ({
      page: 1,
      dialog: false,
      headers: [
        {
          text: "index",
          sortable: false,
          value: "id"
        },
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        {text: 'Body', value: 'body'},
        {text: 'Status', value: 'status'},
        {text: 'Actions', value: 'action', sortable: false},
      ],
      editedIndex: -1,
      editedItem: {
        title: '',
        body: '',
      },
      defaultItem: {
        title: '',
        body: '',
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Notification' : 'Edit Notification'
      },
      notificationData() {
        return this.$store.getters.getNotificationData
      },
      isLoading() {
        return this.$store.getters.getIsLoading
      },
      getTotalNotification() {
        return this.$store.getters.getTotalNotification
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    created() {
      this.$store.dispatch("requestNotification", this.page)
    },

    methods: {

      duplicateItem(item) {
        let id = item.id;
      },

      deleteItem(item) {
        const index = this.$store.getters.getNotificationData.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.$store.dispatch("deleteNotificationAction", item.id) && this.$store.getters.getNotificationData.splice(index, 1)
      },

      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1
        }, 300)
      },

      save() {
        this.close()
      },

      onNextPage(page) {
        this.$store.dispatch("requestNotification", (page));
      },
      onPrevPage(page) {
        this.$store.dispatch("requestNotification", (page));
      },
      onPageChange(page) {
        this.$store.dispatch("requestNotification", page);
      }

    },
  }
</script>

<style scoped>

</style>
