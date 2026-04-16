import React from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, Droplets } from 'lucide-react';

export default function PlantCard({ plant }) {
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

  return (
    <div className="glass-card rounded-[2rem] p-7 group hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between h-full min-h-[220px]">
      
      {/* Decorative Blur blob */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-sage/30 rounded-full blur-3xl group-hover:bg-sage/50 transition-all duration-700 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-extrabold text-forest tracking-tight">{plant.nickname || plant.species}</h3>
          <p className="text-sm text-forest/50 mt-1.5 font-bold tracking-wide">{plant.species}</p>
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

      <div className="relative z-10 mt-10 flex flex-wrap gap-3">
        <Link 
          to={`/dashboard/${plant.id}`} 
          className="flex-1 bg-forest text-cream font-bold py-3.5 px-4 rounded-xl hover:bg-forest/90 transition shadow-lg shadow-forest/20 flex justify-center items-center gap-2 text-sm scale-95 group-hover:scale-100 duration-300"
        >
          <ScanLine className="w-4 h-4" /> Scan
        </Link>
        <button className="flex-1 bg-white/60 text-forest font-bold py-3.5 px-4 rounded-xl hover:bg-white transition border border-white/50 backdrop-blur-sm flex justify-center items-center gap-2 text-sm scale-95 group-hover:scale-100 duration-300">
          <Droplets className="w-4 h-4 text-sage" /> Water
        </button>
      </div>
    </div>
  );
}
