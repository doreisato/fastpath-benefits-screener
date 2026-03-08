"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ zip: "", size: "1", income: "" });
  const [results, setResults] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const size = parseInt(formData.size);
    const inc = parseFloat(formData.income) || 0;
    
    // Federal Poverty Level (FPL) 2024 approximation
    const baseFpl = 15060;
    const extraPerson = 5380;
    const annualFpl = baseFpl + (size - 1) * extraPerson;
    const monthlyFpl = annualFpl / 12;

    setResults({
      snap: inc <= monthlyFpl * 1.3,
      medicaid: inc <= monthlyFpl * 1.38,
      wic: inc <= monthlyFpl * 1.85,
      liheap: inc <= monthlyFpl * 1.5,
    });
  };

  return (
    <main className="flex-1 flex flex-col w-full max-w-2xl mx-auto px-6 py-12">
      <div className="flex-1">
        <h1 className="text-3xl font-medium tracking-tight mb-2">FastPath Screener</h1>
        <p className="text-neutral-500 mb-8">Check your eligibility for SNAP, Medicaid, WIC, and LIHEAP.</p>
        
        <form onSubmit={calculate} className="space-y-6 mb-12 border border-neutral-800 p-6 rounded-lg bg-neutral-950">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">ZIP Code</label>
            <input 
              required
              className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded text-white focus:outline-none focus:border-neutral-500"
              value={formData.zip}
              onChange={(e) => setFormData({...formData, zip: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Household Size</label>
              <input 
                type="number" required min="1"
                className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded text-white focus:outline-none focus:border-neutral-500"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Monthly Income ($)</label>
              <input 
                type="number" required min="0"
                className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded text-white focus:outline-none focus:border-neutral-500"
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded hover:bg-neutral-200 transition">
            Check Eligibility
          </button>
        </form>

        {results && (
          <div className="space-y-4 mb-12">
            <h2 className="text-xl font-medium mb-4">Estimates</h2>
            
            <div className={`p-4 rounded border ${results.snap ? 'border-emerald-900 bg-emerald-950/20' : 'border-neutral-800'}`}>
              <div className="flex justify-between items-center">
                <span className="font-medium">SNAP (Food Stamps)</span>
                <span className={results.snap ? 'text-emerald-400' : 'text-neutral-500'}>
                  {results.snap ? 'Likely Eligible' : 'Unlikely'}
                </span>
              </div>
            </div>
            
            <div className={`p-4 rounded border ${results.medicaid ? 'border-emerald-900 bg-emerald-950/20' : 'border-neutral-800'}`}>
              <div className="flex justify-between items-center">
                <span className="font-medium">Medicaid</span>
                <span className={results.medicaid ? 'text-emerald-400' : 'text-neutral-500'}>
                  {results.medicaid ? 'Likely Eligible' : 'Unlikely'}
                </span>
              </div>
            </div>

            <div className={`p-4 rounded border ${results.wic ? 'border-emerald-900 bg-emerald-950/20' : 'border-neutral-800'}`}>
              <div className="flex justify-between items-center">
                <span className="font-medium">WIC (Women, Infants, Children)</span>
                <span className={results.wic ? 'text-emerald-400' : 'text-neutral-500'}>
                  {results.wic ? 'Likely Eligible' : 'Unlikely'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-2">Requires pregnant, postpartum, or child under 5.</p>
            </div>

            <div className={`p-4 rounded border ${results.liheap ? 'border-emerald-900 bg-emerald-950/20' : 'border-neutral-800'}`}>
              <div className="flex justify-between items-center">
                <span className="font-medium">LIHEAP (Energy Assistance)</span>
                <span className={results.liheap ? 'text-emerald-400' : 'text-neutral-500'}>
                  {results.liheap ? 'Likely Eligible' : 'Unlikely'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-neutral-600 border-t border-neutral-900 pt-6">
          <p>Disclaimer: This tool provides unofficial estimates and is not legal, medical, or financial advice. The administering agency makes the final eligibility decision. Do not use this as a substitute for an official application.</p>
        </div>
      </div>

      <footer className="mt-12 py-6 text-center text-xs text-neutral-600">
        Built by <a href="https://infinite-machines-production.up.railway.app" className="text-neutral-400 hover:text-white transition">Infinite Machines</a>
      </footer>
    </main>
  );
}