import { defineStore } from "pinia";
import { getProductos, crearProducto, editarProducto, eliminarProducto } from "../services/productos";

export const useProductoStore = defineStore("productos", {
  state: () => ({
    productos: []
  }),
  actions: {
    async obtenerProductos() {
      try {
        const res = await getProductos();
       
        this.productos = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async crearProducto(producto) {
      await crearProducto(producto);
      await this.obtenerProductos();
    },
    async editarProducto(producto) {
      await editarProducto(producto);
      await this.obtenerProductos();
    },
    async eliminarProducto(id) {
      await eliminarProducto(id);
      await this.obtenerProductos();
    }
  }
});
