import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import Button from '@mui/material/Button';

export default function MicButton() {
    return (
        <Button
            variant="contained"
            sx={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                bgcolor: 'red',
                color: 'white',
                ":hover": {
                    bgcolor: 'red',
                    opacity: 0.6,
                },
            }}
        >
            <MicIcon sx={{ fontSize: 50 }} />
        </Button>
    );
}