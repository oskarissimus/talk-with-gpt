import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import Button from '@mui/material/Button';
import { micButtonStyles } from './styles';
import useAudioRecorder from './useAudioRecorder';
import PlayButton from './PlayButton';

export default function MicButton() {
    const { isRecording, toggleRecording, audioUrl } = useAudioRecorder();

    return (
        <div>
            <Button
                variant="contained"
                sx={micButtonStyles(isRecording)}
                onClick={toggleRecording}
            >
                {isRecording ? (
                    <StopIcon sx={{ fontSize: 50 }} />
                ) : (
                    <MicIcon sx={{ fontSize: 50 }} />
                )}
            </Button>
            <PlayButton audioUrl={audioUrl} />
        </div>
    );
}
