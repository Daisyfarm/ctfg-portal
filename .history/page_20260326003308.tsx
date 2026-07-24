import { redirect } from 'next/navigation';

export default function Home() {
  // This is the 'Root' signpost
  redirect('/dashboard');
}