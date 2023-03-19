export const micButtonStyles = (isRecording) => ({
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    bgcolor: isRecording ? 'green' : 'red',
    color: 'white',
    ":hover": {
        bgcolor: isRecording ? 'green' : 'red',
        opacity: 0.6,
    },
});

export const playButtonStyles = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    bgcolor: 'blue',
    color: 'white',
    ":hover": {
        bgcolor: 'blue',
        opacity: 0.6,
    },
};
