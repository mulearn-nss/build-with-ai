import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, Droplets, MapPin, Clock } from 'lucide-react';

export default function PlantCard({ plant }) {
  const navigate = useNavigate();
  const score = plant.currentHealthScore || 0;
  
  const getHealthColor = (s) => {
    if (s >= 80) return 'text-forest';
    if (s >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const strokeColor = score >= 80 ? '#1B4332' : score >= 50 ? '#EAB308' : '#EF4444';
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const calculateDays = (dateStr) => {
    if (!dateStr) return '?';
    const diff = new Date() - new Date(dateStr);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };
  const waterDays = calculateDays(plant.lastWateredAt);

  return (
    <div 
      onClick={() => navigate(`/dashboard/${plant.id}`)}
      className="glass-card rounded-[2rem] p-7 group hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between h-full min-h-[220px] cursor-pointer border border-white/40 shadow-sm hover:shadow-2xl hover:border-sage/50 transition-all duration-500 bg-gradient-to-br from-white/80 to-white/30"
    >
      
      {/* Decorative Blur blob */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-sage/30 rounded-full blur-3xl group-hover:bg-sage/50 transition-all duration-700 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-extrabold text-forest tracking-tight">{plant.nickname || plant.species}</h3>
          <p className="text-sm text-forest/60 mt-1 font-bold tracking-wide">
             {plant.species}
          </p>
          {plant.location?.name && (
            <p className="text-xs text-forest/40 mt-2.5 font-bold flex items-center gap-1 bg-forest/5 w-fit px-2.5 py-1 rounded-md border border-forest/5">
               <MapPin className="w-3 h-3" /> {plant.location.name}
            </p>
          )}
        </div>
        
        {/* Radial Progress Indicator */}
        <div className="relative w-16 h-16 flex items-center justify-center shrink-0 drop-shadow-sm ml-2">
          <svg className="w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-sage/30" />
            <circle 
              cx="32" cy="32" r={radius} stroke={strokeColor} strokeWidth="5" fill="transparent"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className={`absolute font-black text-[15px] ${getHealthColor(score)}`}>{score}</span>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-2.5">
         {waterDays !== '?' && (
           <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-forest/40 ml-1 uppercase tracking-wider">
             <Clock className="w-3.5 h-3.5" /> 
             {waterDays === 0 ? 'Hydrated Today' : `${waterDays}d Since Hydration`}
           </div>
         )}
        <button 
           onClick={(e) => { 
             e.stopPropagation(); 
             // Logic to trigger quick-water Action can be hooked here easily 
           }}
           className="w-full bg-forest/5 text-forest font-bold py-3.5 px-4 rounded-xl hover:bg-forest hover:text-cream transition-all border border-forest/10 backdrop-blur-sm flex justify-center items-center gap-2 text-sm scale-[0.98] group-hover:scale-100 duration-300 shadow-sm"
        >
          <Droplets className="w-4 h-4" /> Quick Hydrate
        </button>
      </div>
    </div>
  );
}
