import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip 
} from '@mui/material';

// Updated to accept 'activities' as a prop from the parent (App.jsx/ActivitiesPage)
const ActivityList = ({ activities }) => {
  const navigate = useNavigate();

  // Handle cases where data is still being fetched or is empty
  if (!activities || activities.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 5, border: '2px dashed #ccc', borderRadius: 2, mt: 3 }}>
        <Typography color="text.secondary">No activities logged yet. Start by adding one above!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Activity History</Typography>
      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Card 
              elevation={2}
              sx={{ 
                cursor: 'pointer', 
                borderRadius: 3,
                transition: '0.3s',
                border: '1px solid #eee',
                '&:hover': { 
                  transform: 'translateY(-8px)', 
                  boxShadow: 8,
                  borderColor: 'primary.main' 
                }
              }}
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant='overline' color="primary" fontWeight="bold" sx={{ fontSize: '0.75rem' }}>
                    {activity.type}
                  </Typography>
                  <Chip 
                    label={new Date(activity.createdAt).toLocaleDateString()} 
                    size="small" 
                    variant="outlined" 
                    sx={{ fontSize: '0.7rem' }}
                  />
                </Box>
                
                <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  {activity.duration} <small style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#666' }}>mins</small>
                </Typography>
                
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <span style={{ marginRight: '6px' }}>🔥</span> 
                  {activity.caloriesBurned} Calories
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActivityList;
