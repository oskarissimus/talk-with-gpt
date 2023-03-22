import React from 'react';
import { Button } from '@mui/material';
import { askButtonStyles } from './styles';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useHandleAskButtonClick } from './presenter';

export default function AskButton({ transcriptedText, setAnswer, setIsAsking }) {
    const handleClick = useHandleAskButtonClick(transcriptedText, setAnswer, setIsAsking);

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
