import { Box, Button, CardActions, Chip, CircularProgress, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useActivities } from '../../../lib/hooks/useActivities';

type Props = {
  activity: Activity;
      selectActivity: (id: string) => void;
};

export default function ActivityCard({ activity, selectActivity}: Props) {

  const {deleteActivity} = useActivities();
  return (
    <Card sx={{ maxWidth: 1000, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: 'text.secondary' , mb: 1}}>{activity.date}</Typography>
        <Typography variant="body2" color="text.secondary">
          {activity.description}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {activity.city} / {activity.venue}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <Chip label={activity.category} variant="outlined" />
        <Box sx={{ display: 'flex', gap: 1 }}>       
        <Button onClick={() => deleteActivity.mutate(activity.id)} disabled={deleteActivity.isPending} size="medium" variant="contained" color="error">
          {deleteActivity.isPending ? <CircularProgress size={16} color="inherit" />
            : 'Delete'}
        </Button>
        <Button onClick={() => selectActivity(activity.id)} size="medium" variant="contained" color="primary">
          View
        </Button>
        </Box>
      </CardActions>
    </Card>
  )
}
