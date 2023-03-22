import React, { useEffect } from 'react';
import MicButton from './MicButton';
import useAudioRecorder from './useAudioRecorder';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { getTranscript } from './api/transcript';
import { getAnswer } from './api/answer';
import { say } from './api/textToSpeech';
import StatusInfo from './StatusInfo';



export default function Recorder() {
    const { isRecording, toggleRecording, audioUrl } = useAudioRecorder();
    const [transcriptedText, setTranscriptedText] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [isTranscribing, setIsTranscribing] = React.useState(false);
    const [isAsking, setIsAsking] = React.useState(false);

    const handleTranscriptionAndAnswer = async (audioUrl) => {
        setIsTranscribing(true);
        const transcript = await getTranscript(audioUrl);
        setTranscriptedText(transcript);
        setIsTranscribing(false);

        setIsAsking(true);
        const answer = await getAnswer(transcript);
        setAnswer(answer);
        setIsAsking(false);
        say(answer);
    };

    useEffect(() => {
        if (audioUrl) {
            handleTranscriptionAndAnswer(audioUrl);
        }
    }, [audioUrl]);


    return (
        <Stack
            spacing={2}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <MicButton isRecording={isRecording} toggleRecording={toggleRecording} />
            <StatusInfo
                isTranscribing={isTranscribing}
                isAsking={isAsking}
            />
            <TextField
                label="Transcripted Text"
                multiline
                rows={4}
                value={transcriptedText}
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Answer"
                multiline
                rows={4}
                value={answer}
                variant="outlined"
                fullWidth
            />
        </Stack >

    );
}
