import React from 'react';
import MicButton from './MicButton';
import TranscriptButton from './TranscriptButton';
import PlayButton from './PlayButton';
import useAudioRecorder from './useAudioRecorder';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AskButton from './AskButton';
import LinearProgress from '@mui/material/LinearProgress';

export default function Recorder() {
    const { isRecording, toggleRecording, audioUrl } = useAudioRecorder();
    const [transcriptedText, setTranscriptedText] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [isTranscribing, setIsTranscribing] = React.useState(false);
    const [isAsking, setIsAsking] = React.useState(false);

    return (
        <Grid
            container
            spacing={2}
            justifyContent="space-around"
        >
            <Grid item xs={6}>
                <MicButton isRecording={isRecording} toggleRecording={toggleRecording} />
            </Grid>
            <Grid item xs={6}>
                <PlayButton audioUrl={audioUrl} />
            </Grid>
            <Grid item xs={2}>
                <TranscriptButton audioUrl={audioUrl} setTranscriptedText={setTranscriptedText} setIsTranscribing={setIsTranscribing} />
            </Grid>
            <Grid item xs={10}>
                <TextField
                    multiline
                    rows={4}
                    value={transcriptedText}
                    label="Transcripted Text"
                    variant="outlined"
                    fullWidth
                />
                {isTranscribing && <LinearProgress />}
            </Grid>
            <Grid item xs={2}>
                <AskButton transcriptedText={transcriptedText} setAnswer={setAnswer} setIsAsking={setIsAsking} />
            </Grid>
            <Grid item xs={10}>
                <TextField
                    multiline
                    rows={4}
                    value={answer}
                    label="Answer"
                    variant="outlined"
                    fullWidth
                />
                {isAsking && <LinearProgress />}
            </Grid>
        </Grid >

    );
}

