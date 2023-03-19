import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import { playButtonStyles } from './styles';

export default function PlayButton({ audioUrl }) {
    const handleClick = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={playButtonStyles}
        >
            <PlayArrowIcon sx={{ fontSize: 50 }} />
        </Button>
    );
}