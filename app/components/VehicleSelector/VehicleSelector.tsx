'use client';

import { useState } from 'react';
import vehicleData from '../../data/vehicles.json';
import styles from '../../pages/homepage/page.module.css';

export default function VehicleSelector() {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedSubModel, setSelectedSubModel] = useState<string>('');

  // Get unique years from vehicle data
  const years = Array.from(new Set(vehicleData.vehicles.map(v => v.year))).sort((a, b) => parseInt(b) - parseInt(a));

  // Get makes for selected year
  const makes = selectedYear 
    ? Array.from(new Set(vehicleData.vehicles.filter(v => v.year === selectedYear).map(v => v.make))).sort()
    : [];

  // Get models for selected year and make
  const models = selectedYear && selectedMake
    ? vehicleData.vehicles
        .filter(v => v.year === selectedYear && v.make === selectedMake)
        .flatMap(v => v.models.map(m => m.model))
    : [];

  // Get sub-models for selected year, make, and model
  const subModels = selectedYear && selectedMake && selectedModel
    ? vehicleData.vehicles
        .filter(v => v.year === selectedYear && v.make === selectedMake)
        .flatMap(v => v.models.filter(m => m.model === selectedModel))
        .flatMap(m => m.subModels)
    : [];

  // Reset dependent dropdowns when parent changes
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMake('');
    setSelectedModel('');
    setSelectedSubModel('');
  };

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel('');
    setSelectedSubModel('');
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedSubModel('');
  };

  // Try to read the current text query from any search input on the page
  const getCurrentSearchQuery = (): string => {
    if (typeof document === 'undefined') return '';
    const inputs = document.querySelectorAll('input[name="q"]');
    for (const input of Array.from(inputs)) {
      const val = (input as HTMLInputElement).value?.trim();
      if (val) return val;
    }
    return '';
  };

  const handleSearch = () => {
    if (!selectedYear || !selectedMake || !selectedModel) {
      return;
    }
    
    // Build search URL with vehicle parameters
    const params = new URLSearchParams();
    params.append('year', selectedYear);
    params.append('make', selectedMake);
    params.append('model', selectedModel);
    if (selectedSubModel) {
      params.append('submodel', selectedSubModel);
    }

    // Include text query if present
    const q = getCurrentSearchQuery();
    if (q) {
      params.append('q', q);
    }
    
    // Navigate to local search page
    window.location.href = `/search?${params.toString()}`;
  };

  const handleClear = () => {
    setSelectedYear('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedSubModel('');
  };

  return (
    <div className={styles.vehicleSelector}>
      <div className={styles.vehicleSelectorInner}>
        <select 
          value={selectedYear} 
          onChange={(e) => handleYearChange(e.target.value)}
          className={styles.vehicleDropdown}
        >
          <option value="">Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select 
          value={selectedMake} 
          onChange={(e) => handleMakeChange(e.target.value)}
          className={styles.vehicleDropdown}
          disabled={!selectedYear}
        >
          <option value="">Select Make</option>
          {makes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>

        <select 
          value={selectedModel} 
          onChange={(e) => handleModelChange(e.target.value)}
          className={styles.vehicleDropdown}
          disabled={!selectedMake}
        >
          <option value="">Select Model</option>
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>

        <select 
          value={selectedSubModel} 
          onChange={(e) => setSelectedSubModel(e.target.value)}
          className={styles.vehicleDropdown}
          disabled={!selectedModel}
        >
          <option value="">Select Sub-Model</option>
          {subModels.map(subModel => (
            <option key={subModel} value={subModel}>{subModel}</option>
          ))}
        </select>

        <button 
          onClick={handleSearch}
          className={styles.vehicleSearchBtn}
          disabled={!selectedYear || !selectedMake || !selectedModel}
          title="Search"
        >
          <svg width="20" height="20" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M966.070 981.101l-304.302-331.965c68.573-71.754 106.232-165.549 106.232-265.136 0-102.57-39.942-199-112.47-271.53s-168.96-112.47-271.53-112.47-199 39.942-271.53 112.47-112.47 168.96-112.47 271.53 39.942 199.002 112.47 271.53 168.96 112.47 271.53 112.47c88.362 0 172.152-29.667 240.043-84.248l304.285 331.947c5.050 5.507 11.954 8.301 18.878 8.301 6.179 0 12.378-2.226 17.293-6.728 10.421-9.555 11.126-25.749 1.571-36.171zM51.2 384c0-183.506 149.294-332.8 332.8-332.8s332.8 149.294 332.8 332.8-149.294 332.8-332.8 332.8-332.8-149.294-332.8-332.8z"/>
          </svg>
        </button>

        <button 
          onClick={handleClear}
          className={styles.vehicleClearBtn}
          disabled={!selectedYear && !selectedMake && !selectedModel && !selectedSubModel}
          title="Clear"
        >
          <svg width="20" height="20" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}