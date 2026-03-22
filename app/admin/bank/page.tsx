import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function AdminBankPage() {
  const supabase = await createClient();

  // 1. SECURITY: Check if user is logged in AND is an admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500">
        <h1 className="text-2xl font-bold">⚠️ ACCESS DENIED: ADMINS ONLY</h1>
      </div>
    );
  }

  // 2. FETCH DATA: Get all pending withdrawals
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*, profiles(username)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  // 3. SERVER ACTION: This handles the "Approve" button click
  async function approveTransfer(formData: FormData) {
    'use server';
    const id = formData.get('id');
    const supabase = await createClient();

    const { error } = await supabase
      .from('transactions')
      .update({ status: 'completed' })
      .eq('id', id);

    if (!error) revalidatePath('/admin/bank');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-green-500 tracking-tighter">CTFG CENTRAL BANK</h1>
        <p className="text-slate-400">Process player fund transfers to the game server.</p>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-widest">
              <th className="p-4 font-medium">Player</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Requested</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {transactions && transactions.length > 0 ? (
              transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-green-400">{t.profiles?.username || 'Unknown'}</td>
                  <td className="p-4 font-mono text-xl text-white">${t.amount.toLocaleString()}</td>
                  <td className="p-4 text-slate-400 text-sm">
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <form action={approveTransfer}>
                      <input type="hidden" name="id" value={t.id} />
                      <button 
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-green-900/20 transition-all active:scale-95"
                      >
                        MARK AS PAID IN-GAME
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center text-slate-500 italic">
                  No pending transfers. The vault is quiet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
