<template>
  <v-dialog v-model="visible" max-width="400">
    <v-card>
      <v-card-title class="text-h6">{{ mensaje }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="cancelar">Cancelar</v-btn>
        <v-btn color="green" text @click="confirmar">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ModalConfirm",
  props: { mensaje: { type: String, required: true } },
  setup(_, { emit }) {
    const visible = ref(false);

    const abrir = () => { visible.value = true; };
    const cancelar = () => { visible.value = false; };
    const confirmar = () => {
      emit("confirmar");
      visible.value = false;
    };

    return { visible, abrir, cancelar, confirmar };
  },
};
</script>
