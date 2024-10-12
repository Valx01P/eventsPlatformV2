import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './../public/pages/Home'
import Location from './../public/pages/Location'
import Event from '../public/pages/Event'
import Locations from './../public/pages/Locations'
import Events from './../public/pages/Events'
import NewLocation from './../public/pages/NewLocation'
import EditLocation from './../public/pages/EditLocation'
import NewEvent from './../public/pages/NewEvent'
import EditEvent from './../public/pages/EditEvent'
import NotFound from './../public/pages/NotFound'

const App = () => {

  return (
    <>
      <main className='w-auto h-auto bg-gray-800 m-8'>
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/new" element={<NewLocation />} />
          <Route path="/locations/:locationId" element={<Location />} />
          <Route path="/locations/:locationId/edit" element={<EditLocation />} />
          <Route path="/locations/:locationId/events" element={<Events />} />
          <Route path="/locations/:locationId/events/new" element={<NewEvent />} />
          <Route path="/locations/:locationId/events/:eventId" element={<Event />} />
          <Route path="/locations/:locationId/events/:eventId/edit" element={<EditEvent />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App
