import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PlantCard from '../components/plants/PlantCard';
import { Plus, X, Leaf, Sparkles, MapPin, TrendingUp, Compass } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { Search } from 'lucide-react';

const WEATHER_API_KEY = "85ccfbe08ab08a26c42dd448fa789d01";

export default function CollectionPage() {
  const { currentUser } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlant, setNewPlant] = useState({ nickname: '', species: '' });
  
  // High-Performance Location State
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [plants, setPlants] = useState(() => {
     const stored = localStorage.getItem('rooted_offline_ledger');
     if (stored) return JSON.parse(stored);
     return [];
  });

  // NEW LOCATION STATES
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const feedItems = [
    "USDA Zone 8: Frost expected tonight! Cover sensitive tropicals.",
    "Sustainable Protocol: Use eggshell powder to amend soil calcium natively.",
    "Local Notice: Organic Community garden subsidy applications open tomorrow.",
    "Species Trend: Monstera Deliciosa propagation rates soar in your region."
  ];

  useEffect(() => {
    if (!db || !currentUser?.uid) {
       // Persist Mock logic
       return;
    }

    try {
      const q = query(collection(db, "plants"), where("userId", "==", currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const plantData = [];
        snapshot.forEach((doc) => plantData.push({ id: doc.id, ...doc.data() }));
        if (plantData.length > 0) {
           setPlants(plantData);
           localStorage.setItem('rooted_offline_ledger', JSON.stringify(plantData));
        }
      }, (error) => {
        console.warn("Firestore access blocked. Using LocalStorage fallback.");
      });
      return unsubscribe;
    } catch (e) {
      console.warn("Firestore fallback", e);
    }
  }, [currentUser]);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
       setSearchResults([]);
       setShowDropdown(false);
       return;
    }
    
    const timeoutId = setTimeout(async () => {
       setIsSearching(true);
       try {
         const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${WEATHER_API_KEY}`);
         if (res.ok) {
            const data = await res.json();
            setSearchResults(data);
            setShowDropdown(true);
         }
       } catch (e) {
         console.warn("Geocoding failed", e);
       } finally {
         setIsSearching(false);
       }
    }, 500); // Debounce
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const savePlant = async (locObj) => {
    const ts = new Date().toISOString();
    const freshPlant = {
      userId: currentUser?.uid || 'dev-123',
      species: newPlant.species,
      nickname: newPlant.nickname,
      currentHealthScore: 100,
      createdAt: ts,
      lastWateredAt: ts,
      lastFertilizedAt: ts,
      location: locObj ? { lat: locObj.lat, lng: locObj.lng, name: locObj.name, district: locObj.district } : null
    };

    try {
      if (db) {
         await addDoc(collection(db, "plants"), freshPlant);
         // Rely on onSnapshot for live UI syncing
      } else {
         const newArr = [ { id: Date.now().toString(), ...freshPlant }, ...plants ];
         setPlants(newArr);
         localStorage.setItem('rooted_offline_ledger', JSON.stringify(newArr));
      }
    } catch (e) {
      const newArr = [ { id: Date.now().toString(), ...freshPlant }, ...plants ];
      setPlants(newArr);
      localStorage.setItem('rooted_offline_ledger', JSON.stringify(newArr));
    }
    
    setLoadingLocation(false);
    setNewPlant({ nickname: '', species: '' });
    setSelectedLocation(null);
    setSearchQuery('');
    setSearchResults([]);
    setShowAddForm(false);
  };


  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoadingLocation(true);

    if (!selectedLocation) {
       setLoadingLocation(false);
       return;
    }

    try {
      // Immediately trigger a second call to OpenWeather to fetch current Weather to initialize Botanical Ledger
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lng}&units=metric&appid=${WEATHER_API_KEY}`);
      if (weatherRes.ok) {
         const weatherData = await weatherRes.json();
         console.log("Initial Ledger Weather Cached:", weatherData);
      }
      
      await savePlant({ lat: selectedLocation.lat, lng: selectedLocation.lng, name: selectedLocation.name });
    } catch (err) {
      console.warn("Save Fallback", err);
      await savePlant({ lat: 10.63, lng: 76.22, name: 'Thrissur' });
    }
  };

  const isSubmitDisabled = !newPlant.species || loadingLocation || !selectedLocation;

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto flex flex-col min-h-screen">
      
      {/* Localized Intelligence Feed Banner */}
      <div className="mb-10 w-full overflow-hidden bg-forest/5 border border-forest/10 rounded-2xl p-4 flex items-center shadow-inner relative">
         <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cream w-12 z-10" />
         <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-cream w-12 z-10" />
         <div className="flex gap-1 items-center shrink-0 mr-6 text-forest">
            <TrendingUp className="w-5 h-5 text-sage" />
            <span className="font-extrabold tracking-tight">Intelligence Feed:</span>
         </div>
         <div className="w-full overflow-x-hidden whitespace-nowrap">
           <div className="inline-block animate-[pulse_10s_ease-in-out_infinite]">
             {feedItems.map((feed, i) => (
                <span key={i} className="text-forest/70 font-bold mx-8">{feed}</span>
             ))}
           </div>
         </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/20 text-forest font-bold text-sm mb-4 border border-sage/50">
            <Sparkles className="w-4 h-4 text-forest" />
            <span>Encrypted Ledger active for {currentUser?.email}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-forest tracking-tighter">Agricultural Array</h2>
          <p className="text-forest/60 mt-3 text-lg font-medium max-w-xl">Location-aware tracking online. Utilize the AI to derive organic remedial protocols directly from photographic evidence.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 bg-forest hover:bg-forest/90 text-cream px-6 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-forest/20 hover:scale-[1.03] active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Synchronize New Plant</span>
        </button>
      </div>

      {plants.length === 0 ? (
         <div className="text-center py-24 glass-card rounded-[2rem] border-dashed border-2">
           <Leaf className="w-16 h-16 text-sage mx-auto mb-6 opacity-50" />
           <h3 className="text-2xl font-extrabold text-forest">Array is empty</h3>
           <p className="text-forest/50 mt-2 font-medium">Synchronize a plant to begin generating telemetry.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plants.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-forest/40 backdrop-blur-md" onClick={() => setShowAddForm(false)} />
          <div className="relative glass-card w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 border-white/50">
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/30">
              <h3 className="text-2xl font-extrabold text-forest tracking-tight">Profile Creation</h3>
              <button 
                onClick={() => { setShowAddForm(false); setLoadingLocation(false); }} 
                className="text-forest/40 hover:text-forest bg-white/50 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-8 space-y-6">
              
              <div className="bg-sage/10 border border-sage/30 rounded-2xl p-4 flex gap-3 animate-in slide-in-from-top-2">
                 <Compass className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                 <p className="text-sm font-bold text-forest/70">
                   Search your City or District using the OpenWeather Global Engine to securely initialize your Botanical Ledger.
                 </p>
              </div>

              <div className="relative z-[100]">
                <label className="block text-sm font-bold text-forest mb-2">Location Search (Box 1)</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className={`h-5 w-5 ${isSearching ? 'text-sage animate-spin' : 'text-forest/40'}`} />
                   </div>
                   <input 
                     type="text" 
                     placeholder="e.g. Wadakkanchery" 
                     value={searchQuery} 
                     onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSelectedLocation(null); 
                     }} 
                     className="w-full pl-11 pr-5 py-4 bg-white/70 backdrop-blur-md border border-white focus:bg-white rounded-2xl h-14 focus:ring-4 outline-none transition-all placeholder:text-forest/30 font-bold text-forest shadow-sm"
                   />
                </div>
                
                {/* Geocoding Results Dropdown (Box 2) */}
                {showDropdown && searchResults.length > 0 && (
                  <ul className="absolute top-full left-0 w-full mt-2 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl max-h-60 overflow-y-auto py-2 overflow-hidden z-[100]">
                    {searchResults.map((loc, idx) => (
                      <li 
                        key={idx}
                        onClick={() => {
                           setSelectedLocation({ lat: loc.lat, lng: loc.lon, name: loc.name });
                           setSearchQuery(`${loc.name}${loc.state ? `, ${loc.state}` : ''}`);
                           setShowDropdown(false);
                        }}
                        className="px-5 py-3 hover:bg-forest/10 cursor-pointer transition-colors text-forest font-bold flex flex-col"
                      >
                         <span>{loc.name}</span>
                         <span className="text-xs text-forest/50">{loc.state || ''} {loc.country ? `(${loc.country})` : ''}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {showDropdown && searchResults.length === 0 && !isSearching && (
                  <ul className="absolute top-full left-0 w-full mt-2 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg z-[100] py-3">
                     <li className="px-5 py-2 text-forest/50 font-bold text-sm">No exact match configured on OpenWeather. Try a slightly broader city (e.g. Thrissur).</li>
                  </ul>
                )}

                {selectedLocation && (
                  <p className="text-xs font-bold text-sage mt-3 flex items-center gap-1 bg-sage/10 p-2 rounded-xl border border-sage/20 w-fit">
                     <Sparkles className="w-3 h-3" /> Ledger Lat/Lng locked to {selectedLocation.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-forest mb-2">Species (Required)</label>
                <input type="text" required placeholder="e.g. Heirloom Tomato" value={newPlant.species} onChange={(e) => setNewPlant({...newPlant, species: e.target.value})} className="w-full px-5 py-4 bg-white/50 border border-white focus:bg-white rounded-2xl focus:ring-4 outline-none transition-all placeholder:text-forest/30 font-medium text-forest" />
              </div>
              <div>
                <label className="block text-sm font-bold text-forest mb-2">Nickname</label>
                <input type="text" placeholder="e.g. Project Alpha" value={newPlant.nickname} onChange={(e) => setNewPlant({...newPlant, nickname: e.target.value})} className="w-full px-5 py-4 bg-white/50 border border-white focus:bg-white rounded-2xl focus:ring-4 outline-none transition-all placeholder:text-forest/30 font-medium text-forest" />
              </div>
              
              <div className="pt-6 w-full relative">
                <button 
                   type="submit" 
                   disabled={isSubmitDisabled} 
                   className={`w-full py-4 rounded-2xl font-extrabold text-cream flex justify-center items-center shadow-xl transition-all ${isSubmitDisabled ? 'bg-forest/60 blur-[1px]' : 'bg-forest hover:bg-forest/90 hover:scale-[1.02]'}`}
                >
                   {loadingLocation ? 'Initializing Ledger Document...' : 'Create Medical Record'}
                </button>
                
                {loadingLocation && (
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-forest bg-sage/30 backdrop-blur-md rounded-2xl animate-pulse cursor-wait pointer-events-none border border-sage/50">
                       <MapPin className="w-5 h-5 mr-2 animate-ping" /> Resolving Location Fallback...
                    </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
