import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';
import React from 'react'
type Props = {
  selectedActivity: Activity;
  cancelSelectActivity?: () => void;
  openForm: (id: string) => void;
};
export default function ActivityDetails({selectedActivity, cancelSelectActivity, openForm }: Props) {
    const {activities} = useActivities();
    const activity = activities?.find(x => x.id === selectedActivity.id);

    if (!activity) <Typography> Loading...</Typography>


  return (
    <Card sx={{borderRadius: '3px', backgroundColor: '#f5f5f5', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', maxWidth: 1000}}>
        <CardMedia component="img" src={`/images/categoryImages/${activity.category}.jpg`} />
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography sx={{ color: 'text.secondary' , mb: 1}}>{activity.date}</Typography>
            <Typography variant="body2" color="text.secondary">
                {activity.description}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                {activity.date} / {activity.venue}
            </Typography>
        </CardContent>
        <CardActions>
            <Button color="primary" variant="contained" size="medium" onClick={() => openForm(activity.id)}>
                Edit
            </Button>
            <Button onClick={cancelSelectActivity} color="inherit" variant="contained" size="medium">
                Cancel
            </Button>
        </CardActions>
    </Card>
  )
}
