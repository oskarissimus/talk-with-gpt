import React, { useCallback } from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Button } from "@mui/material";

const dataToBase64 = (dataArray) =>
    btoa(String.fromCharCode.apply(null, dataArray));

const fetchAndPlayAudio = async (answer) => {
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
};

const SayAnswerButton = ({ answer }) => {
    const handleClick = useCallback(() => {
        fetchAndPlayAudio(answer);
    }, [answer]);

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
};

export default React.memo(SayAnswerButton);
