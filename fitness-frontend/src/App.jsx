import React, { useContext, useEffect, useState } from "react" // Added React, useState
import { Box, Button, Typography } from "@mui/material"
import { AuthContext } from "react-oauth2-code-pkce"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import { setCredentials } from "./store/authSlice"
import ActivityForm from "./components/ActivityForm"
import ActivityList from "./components/ActivityList"
import ActivityDetail from "./components/ActivityDetail"
import { getActivities } from "./services/api"; 
import TrendsChart from "./components/TrendsChart";

/* --- This is the main content area shown after login --- */
const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]); // Removed React. prefix

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => { // Removed React. prefix
    fetchActivities(); 
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <ActivityForm onActivityAdded={fetchActivities} />
      
      {/* Show chart only if data exists */}
      {activities.length > 0 && <TrendsChart data={activities} />}
      
      {/* Pass activities as a prop to the list */}
      <ActivityList activities={activities} />
    </Box>
  );
}

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        /* --- DESIGNED LANDING PAGE --- */
        <Box 
          sx={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://unsplash.com")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            textAlign: 'center',
            p: 3
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: '800', mb: 2, letterSpacing: '-0.02em', fontSize: { xs: '3rem', md: '6rem' } }}>
            FITNESS <span style={{ color: '#1976d2' }}>AI</span>
          </Typography>
          
          <Typography variant="h5" sx={{ mb: 4, maxWidth: '600px', opacity: 0.9 }}>
            Track your workouts, get AI-powered health insights, and reach your goals faster than ever.
          </Typography>

          <Button 
            variant="contained" 
            size="large"
            onClick={() => logIn()}
            sx={{ 
              py: 2, 
              px: 8, 
              fontSize: '1.2rem', 
              borderRadius: '50px',
              fontWeight: 'bold',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              '&:hover': { transform: 'scale(1.05)', transition: '0.2s' }
            }}
          >
            GET STARTED
          </Button>
        </Box>
      ) : (
        /* --- ACTUAL APP CONTENT --- */
        <Box>
          <Box sx={{ 
            p: 2, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            bgcolor: 'white', borderBottom: '1px solid #ddd', position: 'sticky', top: 0, zIndex: 1000
          }}>
            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ letterSpacing: '1px' }}>
              FITNESS <span style={{ color: '#333' }}>AI</span>
            </Typography>
            <Button variant="outlined" color="error" onClick={() => logOut()} sx={{ fontWeight: 'bold' }}>
              LOGOUT
            </Button>
          </Box>

          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </Box>
      )}
    </Router>
  );
}

export default App;
