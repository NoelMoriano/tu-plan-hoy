export const getCategories = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error al obtener categorías");

    return res.json();
  } catch (error) {
    console.error("❌ Error en getCategories:", error);
    return [];
  }
};
