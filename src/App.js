import './App.css';
import React, {useState , useEffect} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import './styles/styles.css'
const locales ={
  'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({

  format,
  parse,
  startOfWeek,
  getDay,
  locales
})
const events =[
  {
    title: "Pair Programming",
    allday: true,
    start: new Date(2023,8, 16, 11),
    end: new Date(2023,8  , 16, 16,45)
  },
  {
    title: "Pair Programming Presentations",
    allday: true,
    start: new Date(2023,8, 16, 16,45),
    end: new Date(2023,8  , 16, 17,30)
  },
  {
    title: "Open Studio",
    allday: true,
    start: new Date(2023,8, 16, 10),
    end: new Date(2023,8  , 16, 11)
  },
  {
    title: "Open Studio",
    allday: true,
    start: new Date(2023,8, 17, 10,30),
    end: new Date(2023,8  , 17,12,30)
  },
  {
    title: "LEC: Intro to Databases",
    allday: true,
    start: new Date(2023,8, 19, 19,30),
    end: new Date(2023,8 ,19,20,30)
  },
  {
    title: "LEC: Install SQL",
    allday: true,
    start: new Date(2023,8, 19, 20,30),
    end: new Date(2023,8  , 19,21)
  },
  {
    title: "Open Studio",
    allday: true,
    start: new Date(2023,8, 19, 21),
    end: new Date(2023,8  , 19,22)
  },
]

function App() {
  const [newEvent, setNewEvent] = useState({title:"", start:"",end:""})
  const [allEvents, setAllEvents] = useState(events )
  const [holidays, setHolidays] = useState([]);
  
  useEffect(()=>{
    fetch("https://date.nager.at/api/v3/PublicHolidays/2023/CA")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data)=>{
      const formattedHolidays = data.map((holiday) =>({
        title: holiday.name,
        allday: true,
        start: new Date(holiday.date),
        end: new Date(holiday.date)
      }));
      setHolidays(formattedHolidays);
    })
    .catch((error) =>{
      console.log("error fetching holidays")
    }); 
  },[]);
  function handleAddEvent(){
    setAllEvents([...allEvents, newEvent])
  }
  
  return (
    
    <div className="body">
      <header className='calendar__header'>
        <h1>Calendar</h1>
      </header>
      <div className='add__event--section'>
      <h2>Add an Event</h2>
      <div className='event__title--container'>
        <input type='text' placeholder='Add Title' className='addtitle__field' style={{width:'20%', marginRight:"10px"}}
        value={newEvent.title} onChange={(e)=> setNewEvent({...newEvent, title: e.target.value})}/>
      </div>
      <DatePicker className='date__field' placeholderText='Start Date' style={{marginRight:'10px'}}
      selected ={newEvent.start} onChange={(start)=> setNewEvent({...newEvent, start})}/>
      <DatePicker className='date__field' placeholderText='End Date' 
      selected ={newEvent.end} onChange={(end)=> setNewEvent({...newEvent, end})}/>
      <button className='event__button' style = {{margin:'10px'}} onClick={handleAddEvent}>Add Event</button>
      </div>
      <Calendar localizer={localizer} events={[...allEvents,...holidays]} startAccessor="start" endAccessor="end" className ="calendar" style = {{height:500, margin: "50px"}}></Calendar>
      
    </div>
  );
}

export default App;
