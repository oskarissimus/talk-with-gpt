import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { askButtonStyles } from './styles';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export default function AskButton({ transcriptedText, setAnswer, setIsAsking }) {
    const handleClick = useCallback(async () => {
        setIsAsking(true);

        try {
            const response = await fetch('/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: transcriptedText }),
            });

            if (response.ok) {
                const data = await response.json();
                setAnswer(data);
                setIsAsking(false);
            } else {
                console.error('Error getting answer:', response.statusText);
            }
        } catch (error) {
            console.error('Error getting answer:', error);
        }
    }, [transcriptedText, setAnswer, setIsAsking]);

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={askButtonStyles}
        >
            <QuestionAnswerIcon sx={{ fontSize: 50 }} />
        </Button>
    );
}
