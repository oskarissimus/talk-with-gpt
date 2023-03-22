import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { transcriptButtonStyles } from './styles';
import TranscribeIcon from '@mui/icons-material/Transcribe';

export default function TranscriptButton({ audioUrl, setTranscriptedText, setIsTranscribing }) {
    const handleClick = useCallback(async () => {
        setIsTranscribing(true);
        try {
            const response = await fetch(audioUrl);
            const audioBlob = await response.blob();
            const formData = new FormData();
            formData.append('file', new File([audioBlob], 'audio.webm', { type: 'audio/webm' }));

            const transcribeResponse = await fetch('/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (transcribeResponse.ok) {
                const data = await transcribeResponse.json();
                console.log('transcripted text:', data);
                setTranscriptedText(data);
                setIsTranscribing(false);
            } else {
                console.error('Error transcribing audio:', transcribeResponse.statusText);
            }
        } catch (error) {
            console.error('Error transcribing audio:', error);
        }
    }, [audioUrl, setTranscriptedText, setIsTranscribing]);

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
