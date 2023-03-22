import React from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Button } from "@mui/material";

export default function SayAnswerButton({ answer }) {
    const handleClick = () => {
        fetch(`http://localhost:5000/text-to-speech`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: answer }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                // Konwertuj dane audio na base64
                const base64Data = btoa(
                    String.fromCharCode.apply(null, data.audioContent.data)
                );

                const audio = new Audio();
                audio.src = `data:audio/mp3;base64,${base64Data}`;
                audio.play();
            });
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
