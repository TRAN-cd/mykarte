import Header from "../_components/Header";
import Footer from "../_components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-1 bg-(--color-card-bg)">
      <Header variant="fixed"/>
      <main className="flex-1 flex pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
