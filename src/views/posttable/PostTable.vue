<template>
  <v-app id="inspire">

    <v-data-table
      :footer-props="{
        'items-per-page-options': [10],
      }"
      :headers="headers"
      :hide-default-footer="true"
      :items="postData"
      :items-per-page="10"
      :loading="isLoading"
      class="elevation-1"
      sort-by="id"
      @click:row="onClickItem"
    >

      <template v-slot:item.id="{ item }">
        <v-chip>
          {{postData.map(function(x) {return x.id; }).indexOf(item.id) + 1 + (page - 1) * 10}}
        </v-chip>
      </template>

      <template v-slot:top>
        <v-toolbar color="white" flat>
          <v-toolbar-title>List Posts</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog max-width="900px" style="z-index: 10000" v-model="dialog">
            <!-- <template v-slot:activator="{ on }">
               <v-btn color="primary" dark class="mb-2" v-on="on">Add Post</v-btn>
             </template>-->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field label="name" v-model="editedItem.name"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-checkbox class="mx-2" label="Active Status" v-model="editedItem.status"></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12" sm="12">
                      <v-textarea
                        background-color="grey lighten-2"
                        label="description"
                        v-model="editedItem.description"
                      ></v-textarea>
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
      :length="getTotalPost"
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
    name: "PostTable",
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
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {text: 'Status', value: 'status'},
        {text: 'Actions', value: 'action', sortable: false},
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        status: '',
        description: '',
      },
      defaultItem: {
        id: '',
        name: '',
        status: '',
        description: '',
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Post' : 'Edit Post'
      },
      postData() {
        return this.$store.getters.getPostData
      },
      isLoading() {
        return this.$store.getters.getIsLoading
      },
      getTotalPost() {
        return this.$store.getters.getTotalPost
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    created() {
      this.$store.dispatch("requestPost", this.page)
    },

    methods: {

      changeText(items) {

      },

      editItem(item) {
        this.editedIndex = this.$store.getters.getPostData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.$store.getters.getPostData.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.$store.dispatch("deletePostAction", item.id) && this.$store.getters.getPostData.splice(index, 1)
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
          Object.assign(this.$store.getters.getPostData[this.editedIndex], this.editedItem);
          delete this.editedItem.image;
          this.$store.dispatch("updatePostAction", {data: this.editedItem, id: this.editedItem.id})
        } else {
          delete this.editedItem.image;
          this.$store.dispatch("addPostAction", this.editedItem);
        }
        this.close()
      },

      onNextPage(page) {
        this.$store.dispatch("requestPost", (page));
      },
      onPrevPage(page) {
        this.$store.dispatch("requestPost", (page));
      },
      onPageChange(page) {
        this.$store.dispatch("requestPost", page);
      },

      onClickItem(value) {
        this.$router.push({name: 'ActivityDetail', params: {value: value, id: value.id}});
      }

    },
  }
</script>

<style scoped>

</style>
