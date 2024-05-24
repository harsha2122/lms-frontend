import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidenav from "../Sidenav";
import Header from '../../Header';
import toast from 'react-hot-toast';


const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {

    for (let i = 0; i < allEvents.length; i++) {

      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

      if (
        ((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4) &&
          (d4 <= d3))
      ) {
      toast.error("Clash Event");
        break;
      }

    }


    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className='relative'>
      <div className='sticky top-0 z-20 '>
        <Header />
      </div>
      <aside className="flex flex-row ">
        {/* <Sidenav /> */}
        <div className='flex flex-col w-3/4 mx-auto mb-12'>
          <h1 className='mt-6 mb-2 capitalize text-4xl mx-auto font-bold'>
            Calendar
          </h1>
          <hr className="w-1/4 mx-auto h-2 mb-2 rounded-full bg-gradient-to-r from-gray-700 " />
          
          <div className="flex flex-col z-10 mt-4 mb-4 border-2 rounded-2xl ">
            <h2 className="mx-auto mb-2 mt-2 text-3xl font-bold ">Add New Event</h2>
            <hr />
              <input className="border mt-4 w-1/5 mx-auto  border-gray-500 bg-gray-200 py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="text" placeholder="Add Title"  value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              
              <div className="flex flex-row mt-4 mx-auto">
                <DatePicker className="border  w-full mx-auto  border-gray-500 bg-gray-200 py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker className="border ml-4 w-full mx-auto  border-gray-500 bg-gray-200 py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
              </div>  
                
                <div className="mx-auto mt-2 mb-4">
                  <button  
                    className="w-36  bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-full shadow hover:shadow-lg outline-none  mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddEvent}>
                    Add Event
                  </button>
                </div>

          </div>
          <Calendar className=" rounded-lg text-lg font-semibold mt-8" localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 600}}  />
        </div>
      </aside>
    </div>
  );
}

export default App;