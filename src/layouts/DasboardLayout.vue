<template>
  <v-card>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" title="Home" :to="{name: 'Dasboard'}"></v-list-item>
          <v-list-item prepend-icon="mdi-folder" title="Eventos" :to="{name: 'Eventos'}"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Asistentes" :to="{name: 'Asistentes'}"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <AppBar />
      <v-main>
          <router-view/>
      </v-main>
  </v-card>
</template>

<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";

</script>

<style scoped lang="scss">
.v-main {
  min-height: calc(100vh - 64px);
}
</style>