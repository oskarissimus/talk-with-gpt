import React from 'react';
import { Button } from '@mui/material';
import { transcriptButtonStyles } from './styles';
import TranscribeIcon from '@mui/icons-material/Transcribe';
import { useHandleTranscriptButtonClick } from './presenter';

export default function TranscriptButton({ audioUrl, setTranscriptedText, setIsTranscribing }) {
    const handleClick = useHandleTranscriptButtonClick(audioUrl, setTranscriptedText, setIsTranscribing);

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={transcriptButtonStyles}
        >
            <TranscribeIcon sx={{ fontSize: 50 }} />
        </Button>
    );
}
