import React from 'react';
import MicButton from './MicButton';
import TranscriptButton from './TranscriptButton';
import PlayButton from './PlayButton';
import useAudioRecorder from './useAudioRecorder';
import Grid from '@mui/material/Grid';

export default function Recorder() {
    const { isRecording, toggleRecording, audioUrl } = useAudioRecorder();

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item>
                <MicButton isRecording={isRecording} toggleRecording={toggleRecording} />
            </Grid>
            <Grid item>
                <PlayButton audioUrl={audioUrl} />
            </Grid>
            <Grid item>
                <TranscriptButton audioUrl={audioUrl} />
            </Grid>
        </Grid>

    );
}

