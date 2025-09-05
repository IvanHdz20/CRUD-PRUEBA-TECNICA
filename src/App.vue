<template>
  <v-app>
    
    <v-app-bar app color="primary" elevation="1">
      <v-toolbar-title class="font-weight-medium">Inventario</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="text" prepend-icon="mdi-home">Inicio</v-btn>
      <v-btn to="/crear" variant="outlined" prepend-icon="mdi-plus" class="ml-2">Crear</v-btn>
    </v-app-bar>

    
    <v-main>
      <v-container class="py-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>

</style>