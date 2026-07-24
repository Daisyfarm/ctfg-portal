import { redirect } from 'next/navigation';

export default function RootPage() {
  // This sends Vercel/Users straight to your dashboard folder
  redirect('/dashboard');
}