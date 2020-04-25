<template>
  <v-container>

    <v-card>
      <v-carousel>
        <v-carousel-item
          v-for="(item,i) in eventImage"
          :key="i"
          :src="item"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>

      <v-card-title class="grey darken-2">
        {{eventData.name}}
      </v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col
            class="align-center justify-space-between"
            cols="12"
          >
            <v-row
              align="center"
              class="mr-0"
            >
              <v-avatar
                size="60px"
                class="mx-3"
              >
                <img
                  :src="eventUserAvatar"
                  alt=""
                >
              </v-avatar>
              <div class="media-body">
                <h4>{{eventUserName}}</h4>
                {{eventUserAgeAndGender}}
              </div>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-text-field
              prepend-icon="mdi-account-card-details-outline"
              placeholder="Company"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              placeholder="Job title"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              prepend-icon="mdi-mail"
              placeholder="Email"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              type="tel"
              prepend-icon="mdi-phone"
              placeholder="(000) 000 - 0000"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              prepend-icon="mdi-text"
              placeholder="Notes"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn
          text
          color="primary"
        >More</v-btn>
        <v-spacer />
        <v-btn
          text
          color="primary"
          @click="dialog = false"
        >Cancel</v-btn>
        <v-btn
          text
          @click="dialog = false"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script> 

    export default {
        name: "DetailActivity",
      data() {
          return {
            event: null
          }
      },
      mounted() {
          this.event = this.$route.params.value;
      },
      computed: {
        eventImage() {
          if (this.event == null) return '';
          if (this.event.images.length > 0) return this.event.images;

          return [this.event.image]
        },
        eventData() {
          return this.event == null ? {} : this.event;
        },
        eventUserAvatar() {
          if (this.event == null) return '';
          return this.event.user.avatar;
        },
        eventUserName() {
          if (this.event == null) return '';
          return this.event.user.username;
        },
        eventUserAgeAndGender() {
          return '19M'
        }
      }
    }
</script>

<style scoped>
  display-4 {
    font-size: 1rem !important;
  }
</style>
