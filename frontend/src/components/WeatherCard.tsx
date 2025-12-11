/**
 * WeatherCard Component
 * Renders the result of get_weather backend tool
 */
import React from "react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  unit: string;
}

interface WeatherCardProps {
  data?: WeatherData;
  location?: string;
}

// Weather condition icons mapping
const weatherIcons: Record<string, string> = {
  sunny: "☀️",
  cloudy: "☁️",
  rainy: "🌧️",
  "partly cloudy": "⛅",
  windy: "💨",
};

export function WeatherCard({ data, location }: WeatherCardProps) {
  // If no data yet, show loading state
  if (!data) {
    return (
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white shadow-lg animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 bg-white/30 rounded w-32 mb-2"></div>
            <div className="h-10 bg-white/30 rounded w-24"></div>
          </div>
          <div className="text-6xl opacity-50">🌤️</div>
        </div>
        <p className="mt-4 text-sm opacity-75">
          Loading weather for {location || "..."}
        </p>
      </div>
    );
  }

  const icon = weatherIcons[data.condition] || "🌤️";

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium opacity-90">{data.location}</h3>
          <p className="text-4xl font-bold">
            {data.temperature}°{data.unit === "celsius" ? "C" : "F"}
          </p>
        </div>
        <div className="text-6xl">{icon}</div>
      </div>

      {/* Condition */}
      <p className="mt-2 text-lg capitalize">{data.condition}</p>

      {/* Details */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white/20 rounded-lg p-3">
          <p className="opacity-75">Humidity</p>
          <p className="text-xl font-semibold">{data.humidity}%</p>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <p className="opacity-75">Wind</p>
          <p className="text-xl font-semibold">{data.wind_speed} km/h</p>
        </div>
      </div>
    </div>
  );
}