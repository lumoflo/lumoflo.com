export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className={`relative flex min-h-screen flex-col`}>
        {children}
      </div>
  );
}
