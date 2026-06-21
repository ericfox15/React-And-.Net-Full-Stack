import { useState } from "react";
import axios from "axios";
import { Box, Container, CssBaseline, Typography} from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {useQuery} from "@tanstack/react-query"
function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const {data: activities, isPending} = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await axios.get<Activity[]>('https//:localhost:5001/api/activities');
      return response.data;
    }
  })
  const handleSelectActivity = (id: string) => {
    const activity = activities!.find(a => a.id === id) || null;
    setSelectedActivity(activity);
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(null);
  }
  
  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    /*
    if (activity.id) {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
    } else {
      const newActivity = { ...activity, id: crypto.randomUUID() };
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
    */
   console.log(activity);
  }

  const handleDelete = (id: string) => {
    /*
    setActivities(activities.filter(a => a.id !== id));
    if (selectedActivity?.id === id) {
      setSelectedActivity(null);
    }
      */
     console.log(id);
  }

  return (
      <Box sx={{backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)', minHeight: '100vh'}}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{marginTop: 3}}>
        {!activities || isPending ?
        (
          <Typography>Loading...</Typography>
        ): ( <ActivityDashboard activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />)}

      </Container>
      </Box>
  )
}

export default App
