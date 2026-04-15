import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

const TrendsChart = ({ data }) => {
  // Logic to format your raw activity data for the chart
  const chartData = data.slice(-7).map(activity => ({
    name: new Date(activity.createdAt).toLocaleDateString(undefined, { weekday: 'short' }),
    calories: activity.caloriesBurned,
    duration: activity.duration,
  }));

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Activity Trends (Last 7 Days)</Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#1976d2" strokeWidth={3} name="Calories (kcal)" />
            <Line type="monotone" dataKey="duration" stroke="#82ca9d" strokeWidth={2} name="Duration (min)" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default TrendsChart;
