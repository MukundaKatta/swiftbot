import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'SwiftBot - Robot Fleet Management', description: 'Fleet management, diagnostics, and deployment' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className="dark"><body className="min-h-screen bg-[#050a10] text-gray-100 antialiased">{children}</body></html>);
}
