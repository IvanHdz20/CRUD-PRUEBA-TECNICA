<template>
  <v-container>
    <h1 class="text-h4 mb-4">Gestión de Productos</h1>

    <ProductoTable
      :productos="store.productos"
      @crear="irCrear"
      @editar="irEditar"
      @eliminar="confirmarEliminar"
    />

    <ModalConfirm
      ref="modal"
      mensaje="¿Estás seguro de eliminar este producto?"
      @confirmar="eliminarConfirmado"
    />
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useProductoStore } from "../stores/productosStore";
import ProductoTable from "../components/ProductoTable.vue";
import ModalConfirm from "../components/ModalConfirm.vue";
import { useRouter } from "vue-router";

export default {
  name: "HomeView",
  components: { ProductoTable, ModalConfirm },
  setup() {
    const store = useProductoStore();
    const router = useRouter();
    const modal = ref(null);
    const idEliminar = ref(null);

    onMounted(() => {
      store.obtenerProductos();
    });

    const irCrear = () => router.push("/crear");

    
    const irEditar = (id) => {
      if (!id) {
        console.error("Id inválido recibido:", id);
        alert("No se puede editar este producto. Id no encontrado.");
        return;
      }
      router.push(`/editar/${id}`);
    };

    const confirmarEliminar = (id) => {
      idEliminar.value = id;
      modal.value.abrir();
    };

    const eliminarConfirmado = async () => {
      await store.eliminarProducto(idEliminar.value);
      await store.obtenerProductos();
    };

    return { store, irCrear, irEditar, confirmarEliminar, eliminarConfirmado, modal };
  },
};
</script>
