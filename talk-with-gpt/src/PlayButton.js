import React from 'react';
import { Button } from '@mui/material';
import { playButtonStyles } from './styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useHandlePlayButtonClick } from './presenter';

export default function PlayButton({ audioUrl }) {
    const handleClick = useHandlePlayButtonClick(audioUrl);

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
