You've got the vision! Moving to a dedicated Admin folder is the right play for a pro setup. Since we're adding Discord notifications, you'll need to go to your Discord Server Settings > Integrations > Webhooks and copy a Webhook URL.

Paste that URL into your Vercel Environment Variables as DISCORD_WEBHOOK_URL.

Here is the fully rewritten, all-in-one code for your app/admin/bank/page.tsx.

🏦 The Complete Admin Bank Command Center
TypeScript
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function AdminBankPage() {
  const supabase = await createClient();

  // 1. SECURITY: Ensure only logged-in Admins can see this
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-500 font-mono">
        [ ACCESS DENIED: SYSTEM OVERRIDE REQUIRED ]
      </div>
    );
  }

  // 2. FETCH: Get all pending requests
  const { data: requests } = await supabase
    .from('transactions')
    .select('*, profiles(username)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  // 3. SERVER ACTION: The "Logic" for approving and notifying Discord
  async function processBankAction(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const id = formData.get('id');
    const player = formData.get('player');
    const amount = formData.get('amount');
    const actionType = formData.get('actionType'); // 'complete' or 'deny'

    if (actionType === 'complete') {
      await supabase.from('transactions').update({ status: 'completed' }).eq('id', id);
      
      // DISCORD NOTIFICATION
      if (process.env.DISCORD_WEBHOOK_URL) {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `✅ **Bank Transfer Success!**\n**Player:** ${player}\n**Amount:** $${amount}\n*Transaction marked as paid in-game.*`
          })
        });
      }
    } else {
      await supabase.from('transactions').update({ status: 'denied' }).eq('id', id);
    }

    revalidatePath('/admin/bank');
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end border-b border-zinc-800 pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-green-500">ADMIN VAULT</h1>
            <p className="text-zinc-500 uppercase text-xs tracking-widest mt-1">Enterprise Financial Management</p>
          </div>
          <div className="text-right">
            <span className="text-zinc-500 text-xs">PENDING REQUESTS:</span>
            <div className="text-2xl font-bold">{requests?.length || 0}</div>
          </div>
        </header>

        <div className="grid gap-4">
          {requests && requests.length > 0 ? (
            requests.map((t) => (
              <div key={t.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center group hover:border-green-900/50 transition-all">
                <div className="mb-4 md:mb-0">
                  <span className="text-zinc-500 text-xs block mb-1">PLAYER NAME</span>
                  <h3 className="text-xl font-bold text-white">{t.profiles?.username || 'Unknown Farmer'}</h3>
                </div>

                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <span className="text-zinc-500 text-xs block mb-1">TRANSFER AMOUNT</span>
                  <span className="text-2xl font-mono text-green-400 font-bold">${Number(t.amount).toLocaleString()}</span>
                </div>

                <div className="flex gap-2">
                  <form action={processBankAction}>
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="player" value={t.profiles?.username} />
                    <input type="hidden" name="amount" value={t.amount} />
                    <input type="hidden" name="actionType" value="complete" />
                    <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md transition-transform active:scale-95 shadow-lg shadow-green-900/20">
                      APPROVE & PAY
                    </button>
                  </form>
                  
                  <form action={processBankAction}>
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="actionType" value="deny" />
                    <button className="bg-zinc-800 hover:bg-red-900 text-zinc-400 hover:text-white font-bold py-2 px-4 rounded-md transition-colors">
                      ✕
                    </button>
                  </form>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-zinc-900 rounded-xl">
              <p className="text-zinc-600 italic">No farmers are currently at the window. Check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
