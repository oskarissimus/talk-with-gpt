import React from "react";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { Button } from "@mui/material";

export default function SayAnswerButton({ answer }) {
    const handleClick = () => {
        const utterance = new SpeechSynthesisUtterance(answer);
        utterance.lang = 'pl-PL';
        speechSynthesis.speak(utterance);
    }

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<RecordVoiceOverIcon />}
            onClick={handleClick}
        >
            Say answer
        </Button>
    );
}