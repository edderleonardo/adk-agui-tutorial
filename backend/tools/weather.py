"""
Weather Tool - Se ejecuta en el backend
El resultado se renderiza en el frontend via AG-UI
"""

from typing import Annotated
import random


def get_weather(location: Annotated[str, "The city to get the weather for"]) -> dict:
    """
    Get current weather for a specified location.
    This tool runs on the backend and stream results to the frontend via AG-UI.
    """
    conditions = ["sunny", "cloudy", "rainy", "partly cloudy", "windy", "stormy"]

    weather_data = {
        "location": location,
        "temperature": random.randint(15, 35),
        "condition": random.choice(conditions),
        "humidity": random.randint(30, 90),
        "wind_speed": random.randint(5, 30),
        "unit": "Celsius",
    }

    return weather_data