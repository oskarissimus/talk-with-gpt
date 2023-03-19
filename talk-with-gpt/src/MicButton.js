import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import Button from '@mui/material/Button';
import { micButtonStyles } from './styles';
import useAudioRecorder from './useAudioRecorder';

export default function MicButton() {
    const { recording, handleClick } = useAudioRecorder();

    return (
        <Button
            variant="contained"
            sx={micButtonStyles(recording)}
            onClick={handleClick}
        >
            {recording ? (
                <StopIcon sx={{ fontSize: 50 }} />
            ) : (
                <MicIcon sx={{ fontSize: 50 }} />
            )}
        </Button>
    );
}
