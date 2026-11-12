import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Education from "./pages/Education.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx"; 
// import { AdminRoute } from "./components/ProtectedRoute.jsx";

// One route per required page
export default function App() {
  return (
    // navbar containing all pages
    <>
      <Navbar />
      <main className="page">
        <Routes>
          {/* --- EXISTING PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* --- NEW PUBLIC AUTH ROUTES --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- NEW PROTECTED ADMIN ROUTE --- */}
          {/* Only logged-in users with role: "admin" can access this */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
        </Routes>
      </main>
    </>
  );
}