import { NextResponse } from "next/server";
import pool from "@/lib/db";

// DELETE - Öğrenci sil
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await pool.query("DELETE FROM ogrenciler WHERE id = ?", [id]);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Error deleting from the database" },
      { status: 500 }
    );
  }
}

// PUT - Öğrenci güncelle
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, surname, number } = await request.json();

    await pool.query(
      "UPDATE ogrenciler SET ad = ?, soyad = ?, numara = ? WHERE id = ?",
      [name, surname, number, id]
    );

    return NextResponse.json({ message: "Student updated successfully" });
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Error updating the database" },
      { status: 500 }
    );
  }
}
