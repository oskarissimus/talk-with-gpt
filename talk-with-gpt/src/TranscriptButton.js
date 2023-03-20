import React from 'react';
import TranscribeIcon from '@mui/icons-material/Transcribe';
import Button from '@mui/material/Button';
import { transcriptButtonStyles } from './styles';

export default function TranscriptButton({ audioUrl }) {
    const handleClick = async () => {
        try {
            const response = await fetch(audioUrl);
            console.log("response", response)
            const audioBlob = await response.blob();
            const formData = new FormData();
            formData.append('file', new File([audioBlob], 'audio.webm', { type: 'audio/webm' }));

            const transcribeResponse = await fetch('/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (transcribeResponse.ok) {
                const data = await transcribeResponse.json();
                console.log('sending audio to openai api');
                console.log('transcripted text:', data.text);
            } else {
                console.error('Error transcribing audio:', transcribeResponse.statusText);
            }
        } catch (error) {
            console.error('Error transcribing audio:', error);
        }
    };

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
