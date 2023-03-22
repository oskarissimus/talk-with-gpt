import React from 'react';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';

function StatusItem({ text, visible }) {
    return (
        visible && (
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6" fontSize={20} color="text.secondary">
                    {text}
                </Typography>
                <CircularProgress size={20} />
            </Stack>
        )
    );
}

function StatusInfo({ isTranscribing, isAsking }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <StatusItem text="Transcribing..." visible={isTranscribing} />
            <StatusItem text="Asking ChatGPT..." visible={isAsking} />
        </Box>
    );
}

export default StatusInfo;
