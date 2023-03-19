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
