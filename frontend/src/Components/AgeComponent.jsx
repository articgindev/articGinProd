import React, { useState } from 'react';
import Select from 'react-select';
import './AgeComponent.css';
import textoEdad from '../assets/textos/TextoEdad.png';

const AgeComponent = () => {
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [isAdult, setIsAdult] = useState(null);

  const handleDayChange = (selectedOption) => setDay(selectedOption);
  const handleMonthChange = (selectedOption) => setMonth(selectedOption);
  const handleYearChange = (selectedOption) => setYear(selectedOption);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (day && month && year) {
      const today = new Date();
      const birthDate = new Date(year.value, month.value - 1, day.value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      if (age >= 18) {
        setIsAdult(true);
        localStorage.setItem('isAdult', 'true');
        window.location.href = '/';
      } else {
        setIsAdult(false);
      }
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }));
  const years = Array.from({ length: 100 }, (_, i) => ({
    value: new Date().getFullYear() - i,
    label: new Date().getFullYear() - i,
  }));

  return (
    <div className="ageComponent-container">
      <img src={textoEdad} alt="Texto Edad" className="texto-edad-image" />
      <div className="ageComponent-sub-container">
        <form onSubmit={handleSubmit} className="ageComponent-form">
          <div className="select-container">
            <Select
              value={day}
              onChange={handleDayChange}
              options={days}
              placeholder="Día"
              maxMenuHeight={150} // Controla la altura del menú desplegable
              className="select-day"
              isClearable
            />
            <Select
              value={month}
              onChange={handleMonthChange}
              options={months}
              placeholder="Mes"
              maxMenuHeight={150} // Controla la altura del menú desplegable
              className="select-month"
              isClearable
            />
            <Select
              value={year}
              onChange={handleYearChange}
              options={years}
              placeholder="Año"
              maxMenuHeight={150} // Controla la altura del menú desplegable
              className="select-year"
              isClearable
            />
          </div>
          <button type="submit">Continuar</button>
        </form>
        {isAdult !== null && (
          <div className="ageComponent-result">
            {isAdult ? (
              <p>Bienvenido.</p>
            ) : (
              <p>Para acceder al sitio tenes que ser mayor.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeComponent;
