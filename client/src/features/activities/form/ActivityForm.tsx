import { Box, Paper, TextField, Typography, CircularProgress } from '@mui/material'
import { useState } from 'react';
import React from 'react'
import { useActivities } from '../../../lib/hooks/useActivities';


type Props = {
  activity?: Activity;
  closeForm: () => void;
}

export default function ActivityForm({ activity, closeForm }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {updateActivity, createActivity} = useActivities();
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try{
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
           data[key] = value;
        });

        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
        }
        else{
          await createActivity.mutateAsync(data as unknown as Activity)
        }
      } catch (error){
        console.error("Failed to update activity:", error)
      }
      finally{
        setIsLoading(false);
        closeForm();
      }
    }
  return (
    <Paper sx = {{padding: 2, borderRadius: '3px', backgroundColor: '#f5f5f5', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'}}>
<Typography variant="h5" gutterBottom color="text.primary">
  Create Activity
</Typography>
<Box component="form" onSubmit ={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>  
  <TextField name = "title" label="Title" variant="outlined" fullWidth defaultValue = {activity?.title || ''} />
  <TextField name = "description" label="Description" variant="outlined" fullWidth multiline rows={4} defaultValue = {activity?.description || ''} />
  <TextField name = "category" label="Category" variant="outlined" fullWidth defaultValue = {activity?.category || ''} />
  <TextField name = "date" label="Date" variant="outlined" fullWidth type="date"   defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
/>
  <TextField name = "city" label="City" variant="outlined" fullWidth defaultValue = {activity?.city || ''} />
  <TextField name = "venue" label="Venue" variant="outlined" fullWidth defaultValue = {activity?.venue || ''} />
  <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
    <button type="submit" disabled={isLoading} style={{ backgroundColor: '#218aae', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}> {isLoading && <CircularProgress size={16} color="inherit" />}
            {isLoading ? 'Submitting...' : 'Submit'} 
    </button>
    <button type="button" onClick={closeForm} style={{ backgroundColor: '#f5f5f5', color: '#218aae', padding: '8px 16px', border: '1px solid #218aae', borderRadius: '4px', cursor: 'pointer' }}>
      Cancel
    </button>
  </Box>
</Box>
    </Paper>)
}
