<template>
  <v-app id="inspire">
    <v-data-table
      :footer-props="{
        'items-per-page-options': [10],
      }"
      :headers="headers"
      :hide-default-footer="true"
      :items="userData"
      :items-per-page="10"
      :loading="isLoading"
      class="elevation-1"
      sort-by="id"
    >

      <template v-slot:item.id="{ item }">
        <v-chip>
          {{userData.map(function(x) {return x.id; }).indexOf(item.id) + 1 + (page - 1) * 10}}
        </v-chip>
      </template>

      <template v-slot:item.avatar="{ item }">
        <v-avatar
          size="36px"
        >
          <v-img
            :src="item.avatar"
            alt="Avatar"
            v-if="item.avatar"
          />
        </v-avatar>
      </template>

      <template v-slot:item.created_at="{ item }">
        <span>{{new Date(item.created_at).toLocaleString()}}</span>
      </template>

      <template v-slot:top>
        <v-toolbar color="white" flat>
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog max-width="500px" v-model="dialog">
            <!--<template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>-->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field label="user name" v-model="editedItem.username"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field label="email" v-model="editedItem.email"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field label="gender" v-model="editedItem.gender"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field label="register_type" v-model="editedItem.register_type"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field label="created_at" v-model="editedItem.created_at"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close" color="blue darken-1" text>Cancel</v-btn>
                <v-btn @click="save" color="blue darken-1" text>Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          @click="editItem(item)"
          class="mr-2"
          small
        >mdi-pencil
        </v-icon>
        <v-icon
          @click="deleteItem(item)"
          small
        >mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn @click="initialize" color="primary">Reset</v-btn>
      </template>

    </v-data-table>
    <v-pagination
      :length="totalUser"
      :total-visible="5"
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
    name: "UserTable",
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
          text: "Images",
          align: "left",
          sortable: false,
          value: "avatar"
        },
        {
          text: 'User Name',
          align: 'left',
          sortable: false,
          value: 'username',
        },
        {text: 'Email', value: 'email'},
        {text: 'Gender', value: 'gender'},
        {text: 'Register_type', value: 'register_type'},
        {text: 'created_at', value: 'created_at'},
        {text: 'Actions', value: 'action', sortable: false}
      ],
      editedIndex: -1,
      editedItem: {
        username: '',
        email: '',
        gender: '',
        birthday: '',
        register_type: '',
        created_at: '',
      },
      defaultItem: {
        username: '',
        email: '',
        gender: '',
        birthday: '',
        register_type: '',
        created_at: '',
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit User'
      },
      userData() {
        return this.$store.getters.getUserData
      },
      isLoading() {
        return this.$store.getters.getIsLoading
      },
      totalUser() {
        return this.$store.getters.getTotal
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    created() {
      this.$store.dispatch("requestComparative", this.page)
    },

    methods: {

      editItem(item) {
        this.editedIndex = this.$store.getters.getUserData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.$store.getters.getUserData.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.$store.getters.getUserData.splice(index, 1)
      },

      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.$store.getters.getUserData[this.editedIndex], this.editedItem)
        } else {
          this.$store.getters.getUserData.push(this.editedItem)
        }
        this.close()
      },

      onNextPage(page) {
        this.$store.dispatch("requestComparative", (page));
      },
      onPrevPage(page) {
        this.$store.dispatch("requestComparative", (page));
      },
      onPageChange(page) {
        this.$store.dispatch("requestComparative", page);
      }
    },
  }
</script>

<style scoped>

</style>
