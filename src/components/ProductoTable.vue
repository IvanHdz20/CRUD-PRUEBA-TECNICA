<template>
  <v-container>
    
    <v-text-field
      v-model="busqueda"
      label="Buscar productos..."
      append-inner-icon="mdi-magnify"
      variant="outlined"
      density="compact"
      class="mb-4"
    ></v-text-field>

    
    <v-data-table
      :headers="headers"
      :items="filtrados"
      class="elevation-1"
      density="compact"
    >
      
      <template v-slot:item="{ item }">
        <tr>
          <td style="padding: 8px; text-align: center;">{{ item.Id }}</td>
          <td style="padding: 8px;">{{ item.Nombre }}</td>
          <td style="padding: 8px; text-align: center;">{{ item.Sku }}</td>
          <td style="padding: 8px; text-align: right;">${{ item.Precio }}</td>
          <td style="padding: 8px; text-align: center;">{{ item.Stock }}</td>
          <td style="padding: 8px;">{{ item.Categoria }}</td>
          <td style="padding: 8px; text-align: center;">{{ item.Activo ? 'Sí' : 'No' }}</td>
          <td style="padding: 8px; text-align: center;">
            <v-btn 
              color="orange" 
              size="small" 
              variant="outlined"
              class="mr-1"
              @click="$emit('editar', item.Id)">
              📝
            </v-btn>
            <v-btn 
              color="red" 
              size="small" 
              variant="text"
              @click="$emit('eliminar', item.Id)">
              🗑️
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "ProductoTable",
  props: {
    productos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      busqueda: "",
      headers: [
        { title: "ID", key: "Id", align: "center" },
        { title: "Nombre", key: "Nombre", align: "start" },
        { title: "SKU", key: "Sku", align: "center" },
        { title: "Precio", key: "Precio", align: "end" },
        { title: "Stock", key: "Stock", align: "center" },
        { title: "Categoría", key: "Categoria", align: "start" },
        { title: "Activo", key: "Activo", align: "center" },
        { title: "Acciones", key: "actions", sortable: false, align: "center" },
      ]
    }
  },
  computed: {
    filtrados() {
      if (!this.busqueda) return this.productos;
      const term = this.busqueda.toLowerCase();
      return this.productos.filter(p =>
        p.Nombre.toLowerCase().includes(term) ||
        p.Sku.toLowerCase().includes(term) ||
        p.Categoria.toLowerCase().includes(term)
      );
    }
  }
}
</script>