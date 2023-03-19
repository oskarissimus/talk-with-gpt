import React from 'react';
import MicButton from './MicButton';
import useAudioRecorder from './useAudioRecorder';
import PlayButton from './PlayButton';
import { Stack } from '@mui/system';

export default function Recorder() {
    const { isRecording, toggleRecording, audioUrl } = useAudioRecorder();

    return (
        <Stack spacing={2} direction="row">
            <MicButton isRecording={isRecording} toggleRecording={toggleRecording} />
            <PlayButton audioUrl={audioUrl} />
        </Stack>
    );
}

