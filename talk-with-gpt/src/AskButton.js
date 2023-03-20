import React from 'react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Button from '@mui/material/Button';
import { askButtonStyles } from './styles';

export default function AskButton({ transcriptedText, setAnswer }) {
    const handleClick = async () => {
        console.log('asking question: ', transcriptedText);

        try {
            console.log('asking question: ', transcriptedText);
            const response = await fetch('/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: transcriptedText }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('answer:', data);
                setAnswer(data);
            } else {
                console.error('Error getting answer:', response.statusText);
            }
        } catch (error) {
            console.error('Error getting answer:', error);
        }
    };

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