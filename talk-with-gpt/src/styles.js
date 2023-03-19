export const micButtonStyles = (recording) => ({
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    bgcolor: recording ? 'green' : 'red',
    color: 'white',
    ":hover": {
        bgcolor: recording ? 'green' : 'red',
        opacity: 0.6,
    },
});
