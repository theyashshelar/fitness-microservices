import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Paper, 
  Stack, 
  Typography 
} from '@mui/material';
import { addActivity } from '../services/api';

const ActivityForm = ({ onActivityAdded }) => {
  // 1. Initial State
  const [activity, setActivity] = useState({
    type: "RUNNING", 
    duration: '', 
    caloriesBurned: '',
    additionalMetrics: {}
  });

  // 2. Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation to ensure numbers are entered
    if (!activity.duration || !activity.caloriesBurned) {
      alert("Please fill in both duration and calories.");
      return;
    }

    try {
      await addActivity(activity);
      
      // Notify parent to refresh list
      onActivityAdded(); 
      
      // Reset form
      setActivity({
        type: "RUNNING", 
        duration: '', 
        caloriesBurned: '',
        additionalMetrics: {}
      });
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
  <TextField 
    fullWidth label="Distance (km)" type='number'
    value={activity.additionalMetrics.distance}
    onChange={(e) => setActivity({
      ...activity, 
      additionalMetrics: { ...activity.additionalMetrics, distance: e.target.value }
    })}
  />
  <TextField 
    fullWidth label="Avg Heart Rate" type='number'
    value={activity.additionalMetrics.avgHeartRate}
    onChange={(e) => setActivity({
      ...activity, 
      additionalMetrics: { ...activity.additionalMetrics, avgHeartRate: e.target.value }
    })}
  />
</Stack>
    } catch (error) {
      console.error("Error adding activity:", error);
      alert("Failed to add activity. Please try again.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
        Log New Activity
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        {/* Activity Type Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="activity-type-label">Activity Type</InputLabel>
          <Select 
            labelId="activity-type-label"
            label="Activity Type"
            value={activity.type}
            onChange={(e) => setActivity({...activity, type: e.target.value})}
          >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="WALKING">Walking</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
            <MenuItem value="SWIMMING">Swimming</MenuItem>
            <MenuItem value="WEIGHT_TRAINING">Weight Training</MenuItem>
            <MenuItem value="YOGA">Yoga</MenuItem>
            <MenuItem value="HIIT">HIIT</MenuItem>
            <MenuItem value="CARDIO">Cardio</MenuItem>
            <MenuItem value="STRETCHING">Stretching</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Duration and Calories side-by-side */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField 
            fullWidth 
            label="Duration (Mins)" 
            type='number'
            required
            value={activity.duration}
            onChange={(e) => setActivity({...activity, duration: e.target.value})}
          />
          <TextField 
            fullWidth 
            label="Calories Burned" 
            type='number'
            required
            value={activity.caloriesBurned}
            onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}
          />
        </Stack>

        {/* Submit Button */}
        <Button 
          type='submit' 
          variant='contained' 
          size="large" 
          fullWidth
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          Save Activity
        </Button>
      </Box>
    </Paper>
  );
};

export default ActivityForm;
