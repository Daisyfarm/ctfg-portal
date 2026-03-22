// This goes in your player-side bank page (app/bank/page.tsx)
async function requestWithdrawal(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const amount = Number(formData.get('amount'));
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // 1. Log the request in the transactions table
  const { error } = await supabase
    .from('transactions')
    .insert({
      profile_id: user.id,
      amount: amount,
      type: 'withdraw',
      status: 'pending'
    });

  if (!error) revalidatePath('/bank');
}
