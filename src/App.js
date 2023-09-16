import './App.css';
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React{ useState } from "react";
import DatePicker from 'react-datepicker';

const locales ={
  'en-US': require('date-fns/locale/en-US');
}

const localizer = dateFnsLocalizer({

  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events =[
  title: "event1",
  allday: true
  start: new Date(2023, 9, 16)
  end: new Date(2023, 9, 16)
]

function App() {
  return (
    <div className="body">
      <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end"></Calendar>
    </div>
  );
}

export default App;
