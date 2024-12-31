import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import CreatePage from "./pages/CreatePage"

function App() {

  return (
    <div className="h-screen w-screen container mx-auto flex flex-col gap-10 py-8">
      <Navbar />
      <div className="flex items-center justify-center mt-14">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
