import Nav from "@/components/layout/nav";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Nav>{children}</Nav>
    </div>
  );
}
