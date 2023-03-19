import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';

export default function PlayButton({ audioUrl }) {
    const handleClick = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    return (
        <Button variant="contained" color="primary" onClick={handleClick}>
            <PlayArrowIcon />
        </Button>
    );
}
