import React from 'react'
import Grid from '@mui/material/Grid';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  selectedActivity: Activity | null;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  editMode: boolean;
  submitForm: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
};


export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, openForm, closeForm, editMode, submitForm, deleteActivity}: Props) {
  return (
<Grid
  container
  direction="row"
  spacing = {2}
  sx={{
    justifyContent: "left",
    alignItems: "left",
  }}
>
    <Grid size={7}>
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
    </Grid>
    <Grid size={5}>
        {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm} />}
        {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} submitForm={submitForm} />}
    </Grid>
        
    </Grid> )
}
