// App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Auth
import RequireAuth from "./Components/Auth/RequireAuth";

// Pages
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import NotFound from "./Pages/NotFound";

// Courses
import CourseList from "./Pages/Course/CourseList";
import CourseDescription from "./Pages/Course/CourseDescription";
import CreateCourse from "./Pages/Course/CreateCourse";

// Dashboard
import AddLecture from "./Pages/Dashboard/Addlecture";
import Displaylectures from "./Pages/Dashboard/Displaylectures";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";

// Payment
import Checkout from "./Pages/Payment/Checkout";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";

// User
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/User/Profile";
import EditProfile from "./Pages/User/EditProfile";
import ChangePassword from "./Pages/User/ChangePassword";
import ForgotPassword from "./Pages/User/ForgotPassword";
import ResetPassword from "./Pages/User/ResetPassword";

// Animation (optional, smooth page transitions)
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/denied" element={<Denied />} />
            <Route path="/course/description" element={<CourseDescription />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:resetToken" element={<ResetPassword />} />


            {/* Admin Routes */}
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
              <Route path="/course/create" element={<CreateCourse />} />
              <Route path="/course/addlecture" element={<AddLecture />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* Add more admin routes here */}
            </Route>

            {/* Protected Routes */}
            <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/editprofile" element={<EditProfile />} />
              <Route path="/user/changepassword" element={<ChangePassword />} />
              <Route path="/course/displaylectures" element={<Displaylectures />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/checkout/fail" element={<CheckoutFailure />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
