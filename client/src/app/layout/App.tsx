import { useState } from "react";
import { Box, Container, CssBaseline, Typography} from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";
function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending} = useActivities();

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
        />)}
      </Container>
      </Box>
  )
}

export default App
