import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import gasSensorImage from './images/gasSensor.jpg';

function GasSensorInfo() {
  const [gasSensorData, setGasSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevLevel, setPrevLevel] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState({ ownerEmail: '', ownerName: 'Property Owner', flatno: '' });

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/getAllOwners');
        if (response.data && response.data.length > 0) {
          const defaultOwner = response.data.find((owner) => owner.oemail === 'arokhade02@gmail.com') || response.data[0];
          setOwnerInfo({
            ownerEmail: defaultOwner.oemail,
            ownerName: `${defaultOwner.ofname || ''} ${defaultOwner.olname || ''}`.trim(),
            flatno: defaultOwner.flatno || ''
          });
        }
      } catch (err) {
        console.warn('Failed to fetch owner info for alerts', err);
      }
    };

    fetchOwnerInfo();
  }, []);

  const triggerGasAlert = useCallback(async (gasLevel) => {
    // Show browser pop-up alert
    alert(`⚠️ GAS LEAK DETECTED!\n\nGas Level: ${gasLevel} ppm\nThreshold: 7 ppm\n\nPlease evacuate and contact emergency services immediately!`);

    // Determine owner information from localStorage or fallback ownerInfo
    const ownerEmail = localStorage.getItem('ownerEmail') || ownerInfo.ownerEmail || 'arokhade02@gmail.com';
    const ownerName = localStorage.getItem('ownerName') || ownerInfo.ownerName || 'Property Owner';
    const flatno = localStorage.getItem('flatno') || ownerInfo.flatno || 'A-101';

    if (ownerEmail) {
      try {
        await axios.post('http://localhost:9000/api/sendGasAlert', {
          gasLevel,
          ownerEmail,
          ownerName,
          flatno
        });
        console.log('✉️ Email alert sent to owner');
      } catch (err) {
        console.error('Failed to send email alert:', err);
      }
    }
  }, [ownerInfo]);

  useEffect(() => {
    const fetchGasSensorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:9000/temperature");
        setGasSensorData(response.data);
        
        if (response.data.length > 0) {
          const latestLevel = response.data[response.data.length - 1].gasSensorData;
          const spikeDetected = prevLevel !== null && latestLevel >= 7 && latestLevel - prevLevel >= 0.5;
          const thresholdCrossed = latestLevel >= 7 && (prevLevel === null || prevLevel < 7);
          
          if (thresholdCrossed || spikeDetected) {
            triggerGasAlert(latestLevel);
          }
          
          setPrevLevel(latestLevel);
        }
      } catch (err) {
        setError("Failed to fetch gas sensor data");
      } finally {
        setLoading(false);
      }
    };

    fetchGasSensorData();

    const interval = setInterval(fetchGasSensorData, 6000);

    return () => clearInterval(interval);
  }, [prevLevel, triggerGasAlert]);

  const getStatusColor = (value) => {
    if (value < 7) return "bg-green-500";
    if (value >= 7 && value < 35) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusText = (value) => {
    if (value < 7) return "Safe";
    if (value >= 7 && value < 35) return "Warning";
    return "Danger";
  };

  const isWarningLevel = (value) => value >= 7 && value < 35;

  const latestReading = gasSensorData.length > 0 ? gasSensorData[gasSensorData.length - 1] : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg shadow">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading gas sensor data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg shadow border border-red-200">
        <h2 className="text-lg font-bold text-red-600 mb-2">Error</h2>
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Gas Sensor Monitoring
        </h2>
        <img src={gasSensorImage} alt="Gas Sensor" className="mt-2 w-full h-48 object-cover rounded" />
      </div>

      <div className="p-4">
        {gasSensorData.length > 0 ? (
          <div className="divide-y divide-gray-200">
            <div className="flex flex-col gap-3 mb-4 bg-gray-50 p-3 rounded">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Current Reading</span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">{latestReading ? latestReading.gasSensorData : '-'}</span>
                  <span className="text-gray-500">ppm</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(latestReading ? latestReading.gasSensorData : 0)}`}></div>
                  <span className={`font-medium ${latestReading && latestReading.gasSensorData >= 35 ? 'text-red-600' : latestReading && latestReading.gasSensorData >= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {getStatusText(latestReading ? latestReading.gasSensorData : 0)}
                  </span>
                </div>

                {isWarningLevel(latestReading ? latestReading.gasSensorData : 0) && (
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                    Warning: gas level ≥ 7 ppm
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-3">Historical Readings</h3>
              <div className="max-h-64 overflow-y-auto pr-2">
                {gasSensorData.map((item, index) => (
                  <div key={index} className="mb-2 p-3 rounded border-l-4 hover:bg-gray-50 transition-colors" 
                       style={{ width:'100px',height:'100px', borderLeftColor: getStatusColor(item.gasSensorData).replace('bg-', '') }}>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">{new Date(item.time).toLocaleString()}</span>
                      <div className="flex items-center">
                        <span className="font-semibold mr-1">{item.gasSensorData}</span>
                        <span className="text-gray-500 text-sm">ppm</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="font-medium">No data available</p>
            <p className="text-sm mt-1">Check your sensor connection or wait for readings to begin</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 border-t">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Auto-refreshes every 6 seconds</span>
          <span>Last updated: {latestReading ? new Date(latestReading.time).toLocaleTimeString() : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}

export default GasSensorInfo;
