<template>
  <v-container>
    <h1 class="text-h4 mb-4">Crear Producto</h1>
    <ProductoForm @guardar="crear" @cancelar="irHome" />
  </v-container>
</template>

<script>
import ProductoForm from "../components/ProductoForm.vue";
import { useProductoStore } from "../stores/productosStore";
import { useRouter } from "vue-router";

export default {
  name: "CrearProductoView",
  components: { ProductoForm },
  setup() {
    const store = useProductoStore();
    const router = useRouter();

    const crear = async (producto) => {
      await store.crearProducto(producto);
      router.push("/");
    };

    const irHome = () => router.push("/");

    return { crear, irHome };
  },
};
</script>
