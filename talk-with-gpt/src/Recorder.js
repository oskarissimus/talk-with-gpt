import React from 'react';
import MicButton from './MicButton';
import TranscriptButton from './TranscriptButton';
import PlayButton from './PlayButton';
import useAudioRecorder from './useAudioRecorder';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function Recorder() {
    const { isRecording, toggleRecording, audioUrl } = useAudioRecorder();
    const [transcriptedText, setTranscriptedText] = React.useState('');

    return (
        <Grid
            container
            spacing={2}
            justifyContent="space-around"
        >
            <Grid item>
                <MicButton isRecording={isRecording} toggleRecording={toggleRecording} />
            </Grid>
            <Grid item>
                <PlayButton audioUrl={audioUrl} />
            </Grid>
            <Grid item>
                <TranscriptButton audioUrl={audioUrl} setTranscriptedText={setTranscriptedText} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    multiline
                    rows={4}
                    value={transcriptedText}
                    label="Transcripted Text"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
        </Grid >

    );
}

