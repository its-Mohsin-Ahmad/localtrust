export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Each auth page renders its own full-screen shell (header + layout),
  // so the layout is a transparent passthrough to avoid nested headers.
  return <>{children}</>;
}
