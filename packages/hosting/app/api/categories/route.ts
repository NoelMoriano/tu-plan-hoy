import { NextResponse } from "next/server";
import { currentConfig } from "@/config";

export const GET = async () => {
  try {
    const res = await fetch(`${currentConfig.apiUrl}/categories`);
    if (!res.ok) throw new Error("Error al obtener categorías");

    const categories = await res.json();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener categorías" },
      { status: 500 },
    );
  }
};
