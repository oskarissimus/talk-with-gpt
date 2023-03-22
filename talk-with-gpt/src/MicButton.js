import React from 'react';
import { Button } from '@mui/material';
import { micButtonStyles } from './styles';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { useHandleMicButtonClick } from './presenter';

export default function MicButton({ isRecording, toggleRecording }) {
    const handleClick = useHandleMicButtonClick(isRecording, toggleRecording);
    return (
        <Button
            variant="contained"
            sx={micButtonStyles(isRecording)}
            onClick={handleClick}
        >
            {isRecording ? (
                <StopIcon sx={{ fontSize: 50 }} />
            ) : (
                <MicIcon sx={{ fontSize: 50 }} />
            )}
        </Button>
    );
}
