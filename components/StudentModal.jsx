'use client';

export default function StudentModal({
 isOpen,
 onClose,
 onSubmit,
 title,
 student = null
}) {
 const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
   name: formData.get('name'),
   surname: formData.get('surname'),
   number: formData.get('number')
  };
  onSubmit(data);
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
    <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-6 rounded-t-2xl">
     <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold flex items-center gap-3">
       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
       </svg>
       {title}
      </h2>
      <button
       onClick={onClose}
       className="text-white hover:text-gray-200 transition-colors"
      >
       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
       </svg>
      </button>
     </div>
    </div>

    <form onSubmit={handleSubmit} className="p-6 space-y-4">
     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
       </svg>
       Öğrenci Adı
      </label>
      <input
       type="text"
       name="name"
       defaultValue={student?.ad || ''}
       placeholder="Öğrenci adı giriniz"
       required
       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#667eea] focus:outline-none transition-colors"
      />
     </div>

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
       </svg>
       Öğrenci Soyadı
      </label>
      <input
       type="text"
       name="surname"
       defaultValue={student?.soyad || ''}
       placeholder="Öğrenci soyadı giriniz"
       required
       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#667eea] focus:outline-none transition-colors"
      />
     </div>

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
       </svg>
       Öğrenci Numarası
      </label>
      <input
       type="text"
       name="number"
       defaultValue={student?.numara || ''}
       placeholder="Öğrenci numarası giriniz"
       required
       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#667eea] focus:outline-none transition-colors"
      />
     </div>

     <div className="flex gap-3 pt-4">
      <button
       type="button"
       onClick={onClose}
       className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
      >
       <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
       </svg>
       Kapat
      </button>
      <button
       type="submit"
       className="flex-1 px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
      >
       <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
       </svg>
       {student ? 'Güncelle' : 'Öğrenciyi Ekle'}
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}