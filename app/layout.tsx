export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0b0f1a' }}>{children}</body>
    </html>
  )
}
