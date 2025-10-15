"use client";

import { useState, useEffect } from "react";
import StudentModal from "@/components/StudentModal";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Öğrenciler yüklenirken hata:", error);
      alert("Öğrenciler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (data) => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Öğrenci başarıyla eklendi!");
        setIsAddModalOpen(false);
        loadStudents();
      } else {
        alert("Öğrenci eklenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Ekleme hatası:", error);
      alert("Öğrenci eklenirken bir hata oluştu.");
    }
  };

  const handleEditStudent = async (data) => {
    try {
      const response = await fetch(`/api/students/${selectedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Öğrenci başarıyla güncellendi!");
        setIsEditModalOpen(false);
        setSelectedStudent(null);
        loadStudents();
      } else {
        alert("Öğrenci güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Öğrenci güncellenirken bir hata oluştu.");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!confirm("Bu öğrenciyi silmek istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Öğrenci başarıyla silindi.");
        loadStudents();
      } else {
        alert("Öğrenci silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Öğrenci silinirken bir hata oluştu.");
    }
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Öğrenci Kayıt Sistemi
            </h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Yeni Öğrenci Ekle
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Ad
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Soyad
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Numara
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Yükleniyor...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Henüz öğrenci eklenmedi
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-800">{student.id}</td>
                    <td className="px-6 py-4 text-gray-800">{student.ad}</td>
                    <td className="px-6 py-4 text-gray-800">{student.soyad}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {student.numara}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(student)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <StudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddStudent}
        title="Yeni Öğrenci Ekle"
      />

      <StudentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStudent(null);
        }}
        onSubmit={handleEditStudent}
        title="Öğrenci Düzenle"
        student={selectedStudent}
      />
    </div>
  );
}
