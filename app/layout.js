import "./globals.css";

export const metadata = {
  title: "Öğrenci Kayıt Sistemi",
  description: "Öğrenci bilgilerini kolayca yönetin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
