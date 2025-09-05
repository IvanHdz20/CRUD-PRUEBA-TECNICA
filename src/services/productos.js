const API_URL = "http://localhost:3000/api/productos";

export async function getProductos() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function getProductoPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Producto no encontrado");
  return await response.json();
}

export async function crearProducto(producto) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return await res.json();
}

export async function editarProducto(producto) {
  const res = await fetch(`${API_URL}/${producto.Id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al editar producto");
  return await res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return await res.json();
}
