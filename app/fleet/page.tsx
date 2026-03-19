// Inside your fleet.map list in fleet/page.tsx, add this:
const toggleSale = async (item: any) => {
  const price = prompt("Enter Sale Price ($):");
  if (!price) return;
  await sb.from('fleet').update({ is_for_sale: true, price: parseInt(price) }).eq('id', item.id);
  alert("Item listed on Marketplace!");
  load();
};

// And in the JSX (the HTML part), add a button for the owner:
{i.owner_id === myId && !i.is_for_sale && (
  <button onClick={()=>toggleSale(i)} style={{background:'#f97316', color:'#fff', border:'none', padding:'5px 10px', borderRadius:'5px', marginTop:'5px'}}>List for Sale</button>
)}
