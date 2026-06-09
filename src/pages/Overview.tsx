import { Users, ShoppingBag, Percent, MessageSquare, Plus, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Overview() {
  // 1. Mock Data للإحصائيات السريعة
  const stats = [
    {
      title: 'Total Products',
      value: '142',
      desc: 'Active in database',
      icon: <ShoppingBag size={20} className="text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      title: 'AI Consultations',
      value: '1,840',
      desc: 'Total sessions triggered',
      icon: <MessageSquare size={20} className="text-blue-600" />,
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      title: 'Top Skin Type',
      value: 'Oily Skin (58%)',
      desc: 'Most requested routine',
      icon: <Users size={20} className="text-purple-600" />,
      bg: 'bg-purple-50 border-purple-100',
    },
    {
      title: 'Active Noon Coupons',
      value: '6',
      desc: 'Tracking links running',
      icon: <Percent size={20} className="text-amber-600" />,
      bg: 'bg-amber-50 border-amber-100',
    },
  ];

  // 2. Mock Data لآخر الاستشارات الذكية التي تمت لايف
  const recentConsultations = [
    { id: 1, time: 'Just now', skinType: 'Oily Skin', issue: 'Acne & Dark Spots', topPick: 'Effaclar Duo(+)' },
    { id: 2, time: '12 mins ago', skinType: 'Dry Skin', issue: 'Severe Dehydration', topPick: 'CeraVe Moisturizing Cream' },
    { id: 3, time: '45 mins ago', skinType: 'Combination', issue: 'Enlarged Pores', topPick: 'The Ordinary Niacinamide' },
    { id: 4, time: '1 hour ago', skinType: 'Oily Skin', issue: 'Excessive Sebum', topPick: 'Bioderma Sébium Gel' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ─── SECTION 1: HEADER ─── */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard Overview</h1>
        <p className="text-sm text-zinc-500 mt-1">Track your Lily Closet metrics and AI backend activity seamlessly.</p>
      </div>

      {/* ─── SECTION 2: STATS CARDS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className={`p-5 rounded-xl border bg-white shadow-xs flex items-start justify-between`}>
            <div className="space-y-2">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{stat.title}</span>
              <h3 className="text-2xl font-bold text-zinc-800 tracking-tight">{stat.value}</h3>
              <p className="text-xs text-zinc-400 font-medium">{stat.desc}</p>
            </div>
            <div className={`p-3 rounded-lg border ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ─── SECTION 3: QUICK ACTIONS & RECENT ACTIVITY ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Consultations Table (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-zinc-200 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-zinc-800">Recent Live Consultations</h2>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-1 rounded border border-emerald-100">Live Feed</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-600">
                <thead className="text-xs text-zinc-400 uppercase bg-zinc-50 border-b border-zinc-100">
                  <tr>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Skin Type</th>
                    <th className="py-3 px-4">Detected Issue</th>
                    <th className="py-3 px-4">Top AI Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {recentConsultations.map((chat) => (
                    <tr key={chat.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-zinc-400 text-xs">{chat.time}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-100 text-zinc-700">
                          {chat.skinType}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-zinc-800">{chat.issue}</td>
                      <td className="py-3 px-4 text-emerald-600 font-semibold text-xs">{chat.topPick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Management Actions (Takes 1 column) */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-xs p-6 space-y-4">
          <h2 className="text-base font-bold text-zinc-800 mb-2">Quick Shortcuts</h2>
          
          <Link 
            to="/dashboard/products/add" 
            className="flex items-center gap-3 w-full p-4 rounded-xl border border-zinc-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-zinc-700 hover:text-emerald-800 transition-all group"
          >
            <div className="p-2 rounded-lg bg-zinc-50 group-hover:bg-emerald-100 text-zinc-500 group-hover:text-emerald-600 transition-colors">
              <Plus size={18} />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold">Add New Product</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Inject item to AI inventory</p>
            </div>
          </Link>

          <div 
            className="flex items-center gap-3 w-full p-4 rounded-xl border border-zinc-200 hover:border-amber-300 hover:bg-amber-50/30 text-zinc-700 hover:text-amber-800 transition-all group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-zinc-50 group-hover:bg-amber-100 text-zinc-500 group-hover:text-amber-600 transition-colors">
              <Ticket size={18} />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold">Noon Coupon Codes</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Manage discount parameters</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}