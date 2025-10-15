import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET - Tüm öğrencileri getir
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM ogrenciler");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Error fetching from the database" },
      { status: 500 }
    );
  }
}

// POST - Yeni öğrenci ekle
export async function POST(request) {
  try {
    const { name, surname, number } = await request.json();

    const [result] = await pool.query(
      "INSERT INTO ogrenciler (ad, soyad, numara) VALUES (?, ?, ?)",
      [name, surname, number]
    );

    return NextResponse.json(
      { message: "Student added successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting student:", error);
    return NextResponse.json(
      { error: "Error inserting into the database" },
      { status: 500 }
    );
  }
}
