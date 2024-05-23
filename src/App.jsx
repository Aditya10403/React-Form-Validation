import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import NavBar from './components/NavBar'
import Success from './components/Success'

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  )
}

export default App
