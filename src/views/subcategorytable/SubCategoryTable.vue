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
      :items="subcategoryData"
      :items-per-page="10"
      :loading="isLoading"
      class="elevation-1"
      sort-by="id"
    >

      <template v-slot:item.id="{ item }">
        <v-chip>
          {{subcategoryData.map(function(x) {return x.id; }).indexOf(item.id) + 1 + (page - 1) * 10}}
        </v-chip>
      </template>

      <template v-slot:item.category="{ item }">
        {{ formatCategory(item.category) }}
      </template>

      <template v-slot:item.logo="{ item }">
        <v-img :src="item.logo" style="width: 50px; height: 50px"/>
      </template>

      <template v-slot:top>
        <v-toolbar color="white" flat>
          <v-toolbar-title>List SubCategories</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog max-width="500px" v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn class="mb-2" color="primary" dark v-on="on">Add SubCategory</v-btn>
            </template>
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
      :length="getTotalSubCategory"
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
    name: "SubSubCategoryTable",
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
          text: 'Category',
          align: 'left',
          sortable: false,
          value: 'category',
        },
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: "Logo",
          sortable: false,
          value: "logo"
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
        return this.editedIndex === -1 ? 'New SubCategory' : 'Edit SubCategory'
      },
      subcategoryData() {
        return this.$store.getters.getSubCategoryData
      },
      isLoading() {
        return this.$store.getters.getIsLoading
      },
      getTotalSubCategory() {
        return this.$store.getters.getTotalSubCategory
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    created() {
      this.$store.dispatch("requestSubCategory", this.page);
      this.$store.dispatch("requestCategory", 1);
    },

    methods: {

      formatCategory(value) {
        let tempdata = this.$store.getters.getCategoryData;
        for (let i = 0; i < tempdata.length; i++) {
          if (tempdata[i].id === value) {
            return tempdata[i].name;
          }
        }
      },

      editItem(item) {
        this.editedIndex = this.$store.getters.getSubCategoryData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.$store.getters.getSubCategoryData.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.$store.dispatch("deleteSubCategoryAction", item.id) && this.$store.getters.getSubCategoryData.splice(index, 1)
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
          Object.assign(this.$store.getters.getSubCategoryData[this.editedIndex], this.editedItem);
          delete this.editedItem.image;
          this.$store.dispatch("updateSubCategoryAction", {data: this.editedItem, id: this.editedItem.id})
        } else {
          delete this.editedItem.image;
          this.$store.dispatch("addSubCategoryAction", this.editedItem);
        }
        this.close()
      },

      onNextPage(page) {
        this.$store.dispatch("requestSubCategory", (page));
      },
      onPrevPage(page) {
        this.$store.dispatch("requestSubCategory", (page));
      },
      onPageChange(page) {
        this.$store.dispatch("requestSubCategory", page);
      }
    },
  }
</script>

<style scoped>

</style>
