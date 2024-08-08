import React, { useState } from 'react';
import './AgeComponent.css';
import textoEdad from '../assets/textos/TextoEdad.png';

const AgeComponent = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isAdult, setIsAdult] = useState(null);

  const handleDayChange = (e) => setDay(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age >= 18) {
      setIsAdult(true);
    } else {
      setIsAdult(false);
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="ageComponent-container">
      <img src={textoEdad} alt="Texto Edad" className="texto-edad-image" />
      <div className="ageComponent-sub-container">
        <form onSubmit={handleSubmit} className="ageComponent-form">
          <div className="select-container">
            <select value={day} onChange={handleDayChange} required>
              <option value="">Dia</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select value={month} onChange={handleMonthChange} required>
              <option value="">Mes</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select value={year} onChange={handleYearChange} required>
              <option value="">Año</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Continuar</button>
        </form>
        {isAdult !== null && (
          <div className="ageComponent-result">
            {isAdult ? <p>You are an adult.</p> : <p>You are not an adult.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeComponent;
