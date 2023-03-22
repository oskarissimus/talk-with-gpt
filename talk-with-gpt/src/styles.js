const commonButtonStyles = (color) => ({
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    color: 'white',
    bgcolor: color,
    ":hover": {
        opacity: 0.6,
    },
});

export const micButtonStyles = (isRecording) => commonButtonStyles(isRecording ? 'green' : 'red');
export const playButtonStyles = commonButtonStyles('blue');
export const transcriptButtonStyles = commonButtonStyles('orange');
export const askButtonStyles = commonButtonStyles('purple');
