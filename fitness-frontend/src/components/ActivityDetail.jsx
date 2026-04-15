import React, { useEffect, useState, useContext } from 'react'; // Added useContext
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Added axios
import { AuthContext } from "react-oauth2-code-pkce"; // Added AuthContext
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { 
  Box, 
  Card, 
  CardContent, 
  Divider, 
  Typography, 
  Paper, 
  Grid, 
  Stack, 
  CircularProgress, 
  Button 
} from '@mui/material';
import { getActivityDetail } from '../services/api';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, tokenData } = useContext(AuthContext); // Moved inside the component
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity detail:", error);
      }
    };
    if (id) fetchActivityDetail();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:8080/api/activities/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-User-ID': tokenData?.sub 
          }
        });
        navigate('/activities');
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete activity. Please check your backend.");
      }
    }
  };

  if (!activity) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      {/* Navigation & Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/activities')}>
          Back
        </Button>
        <Button startIcon={<DeleteIcon />} color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>

      {/* Main Stats Card */}
      <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 3 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">{activity.type}</Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
              {new Date(activity.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h3" fontWeight="bold">{activity.caloriesBurned}</Typography>
            <Typography variant="h6" sx={{ opacity: 0.8 }}>kcal</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Additional Metrics Grid - Fixed 'item' prop warning by using sx */}
      {activity.additionalMetrics && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {Object.entries(activity.additionalMetrics).map(([key, value]) => (
            value && (
              <Grid item xs={4} key={key}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">
                    {key.toUpperCase()}
                  </Typography>
                  <Typography variant="h6">{value}</Typography>
                </Paper>
              </Grid>
            )
          ))}
        </Grid>
      )}

      {/* AI Recommendation Section */}
      {activity.recommendation && (
        <Paper elevation={0} sx={{ p: 4, bgcolor: '#f8faff', border: '1px solid #e0e7ff', borderRadius: 4 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 3 }}>
            <AutoAwesomeIcon color="primary" />
            <Typography variant="h5" color="primary.dark" fontWeight="bold">AI Insights</Typography>
          </Stack>
          <Typography variant="h6" fontWeight="bold">Analysis</Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            {activity.recommendation}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="secondary.main" fontWeight="bold">🚀 Improvements</Typography>
              {activity.improvements?.map((item, i) => (
                <Typography key={i} sx={{ py: 0.5 }}>• {item}</Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="error.main" fontWeight="bold">🛡️ Safety</Typography>
              {activity.safety?.map((item, i) => (
                <Typography key={i} sx={{ py: 0.5 }}>• {item}</Typography>
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default ActivityDetail;
