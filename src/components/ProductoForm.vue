<template>
  <v-form ref="form" @submit.prevent="guardar">
    <v-text-field
      v-model="producto.Nombre"
      label="Nombre"
      required
    />
    <v-text-field
      v-model="producto.Sku"
      label="SKU"
      required
    />
    <v-text-field
      v-model.number="producto.Precio"
      label="Precio"
      type="number"
      required
    />
    <v-text-field
      v-model.number="producto.Stock"
      label="Stock"
      type="number"
    />
    <v-text-field
      v-model="producto.Categoria"
      label="Categoría"
      required
    />
    <v-switch
      v-model="producto.Activo"
      label="Activo"
    />

    <v-btn type="submit" color="primary">{{ botonTexto }}</v-btn>
    <v-btn text @click="$emit('cancelar')">Cancelar</v-btn>
  </v-form>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "ProductoForm",
  props: {
    productoInicial: {
      type: Object,
      default: () => ({
        Id: null,
        Nombre: "",
        Sku: "",
        Precio: 0,
        Stock: 0,
        Categoria: "",
        Activo: true
      }),
    },
    modo: {
      type: String,
      default: "crear", 
    },
  },
  setup(props, { emit }) {
    const producto = ref({ ...props.productoInicial });

    const form = ref(null);

    const botonTexto = props.modo === "editar" ? "Actualizar" : "Guardar";

    watch(
      () => props.productoInicial,
      (nuevo) => {
        producto.value = { ...nuevo };
      }
    );

    const guardar = () => {
      emit("guardar", producto.value);
    };

    return { producto, form, guardar, botonTexto };
  },
};
</script>
