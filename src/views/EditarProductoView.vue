<template>
  <v-container>
    <h1 class="text-h4 mb-4">Editar Producto</h1>

    <div v-if="cargando">Cargando producto...</div>

    <ProductoForm
      v-else
      :producto-inicial="producto"
      modo="editar"
      @guardar="guardar"
      @cancelar="irHome"
    />
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProductoForm from "../components/ProductoForm.vue";
import { getProductoPorId, editarProducto } from "../services/productos.js";

export default {
  name: "EditarProductoView",
  components: { ProductoForm },
  setup() {
    const producto = ref(null);
    const cargando = ref(true);
    const router = useRouter();
    const route = useRoute();

    const cargarProducto = async () => {
      try {
        const id = route.params.id;
if (!id) throw new Error("ID de producto no proporcionado");
producto.value = await getProductoPorId(id);

      } catch (err) {
        console.error(err);
        alert(err.message);
        router.push("/");
      } finally {
        cargando.value = false;
      }
    };

    const guardar = async (prodEditado) => {
      try {
        
        if (!prodEditado.Id) prodEditado.Id = producto.value.Id;
        await editarProducto(prodEditado);
        alert("Producto actualizado correctamente");
        router.push("/");
      } catch (err) {
        console.error(err);
        alert("Error al editar producto");
      }
    };

    const irHome = () => router.push("/");

    onMounted(() => cargarProducto());

    return { producto, cargando, guardar, irHome };
  },
};
</script>
