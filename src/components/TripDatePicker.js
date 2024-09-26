import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TripDatePicker = ({ tripId, onDateSelect }) => {
  const [dates, setDates] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);

  useEffect(() => {
    // Récupérer les dates disponibles pour le voyage
    axios.get(`/trips/${tripId}/dates`)
      .then(response => {
        setDates(response.data.trip_dates || []);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des dates du voyage', error);
      });
  }, [tripId]);

  const isWithinDateRange = (date, startDate, endDate) => {
    return date >= new Date(startDate) && date <= new Date(endDate);
  };

  const handleDateChange = (selectedDate) => {
    const foundRange = dates.find(({ start_date, end_date }) =>
      isWithinDateRange(selectedDate, start_date, end_date)
    );

    if (foundRange) {
      setSelectedRange({
        start: new Date(foundRange.start_date),
        end: new Date(foundRange.end_date),
        price: foundRange.price, // Récupérer le prix de la période sélectionnée
        id: foundRange.id, // Ajouter l'ID du trip_date
      });

      // Passer la période et le prix à TripDetail via onDateSelect
      onDateSelect({
        start: new Date(foundRange.start_date),
        end: new Date(foundRange.end_date),
        price: foundRange.price,
        id: foundRange.id, // Inclure l'ID du trip_date pour la réservation
      });
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-black mb-4">Sélectionnez une période</h3>
      <Calendar
        onChange={handleDateChange}
        value={selectedRange ? [selectedRange.start, selectedRange.end] : null}
        tileDisabled={({ date }) =>
          !dates.some(({ start_date, end_date }) => isWithinDateRange(date, start_date, end_date))
        }
        selectRange={false}
      />

      {selectedRange && (
        <div className="mt-4">
          <p>Période sélectionnée : {selectedRange.start.toLocaleDateString()} - {selectedRange.end.toLocaleDateString()}</p>
          <p>Prix : {selectedRange.price} €</p> {/* Affichage du prix */}
        </div>
      )}
    </div>
  );
};

export default TripDatePicker;
