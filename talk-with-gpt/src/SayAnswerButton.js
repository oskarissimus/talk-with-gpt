import React from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Button } from "@mui/material";

function dataToBase64(dataArray) {
    return btoa(String.fromCharCode.apply(null, dataArray));
}

async function fetchAndPlayAudio(answer) {
    const response = await fetch("http://localhost:5000/text-to-speech", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: answer }),
    });

    const data = await response.json();
    const base64Data = dataToBase64(data.audioContent.data);

    const audio = new Audio();
    audio.src = `data:audio/mp3;base64,${base64Data}`;
    audio.play();
}

export default function SayAnswerButton({ answer }) {
    const handleClick = () => {
        fetchAndPlayAudio(answer);
    };

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
