export default function AboutPage() {
  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold mb-4">About Iron Daisy Agri</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-green-400">Our Operations & Logistics</h2>
          <p className="text-gray-300">
            Welcome to the official hub for Iron Daisy Agri! Here, our executive board, farm managers, and contractors collaborate to keep operations running smoothly and the economy thriving. 
          </p>
          <p className="text-gray-300">
            We feature the **Federal Shipping Network (FSN)**, our full-scale virtual logistics center where players invest cash and manage a transport fleet—including trucks, cargo ships, and freight planes—tracking everything across our live map in real time.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">Key Features</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><span className="font-semibold text-white">Customs Silo:</span> Better pricing and inventory control for crops and goods.</li>
            <li><span className="font-semibold text-white">FSN Fleet Tracking:</span> Live map tracking for virtual trucks, ships, and planes.</li>
            <li><span className="font-semibold text-white">Contracts & Mayor Projects:</span> Public works and operational contracts to sustain activity.</li>
            <li><span className="font-semibold text-white">Live Auctions:</span> Bid on rare items, equipment, and assets.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
