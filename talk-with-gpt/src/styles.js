const commonButtonStyles = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    color: 'white',
    ":hover": {
        opacity: 0.6,
    },
};


function makeButtonStyles(color) {
    return {
        ...commonButtonStyles,
        bgcolor: color,
        ":hover": {
            ...commonButtonStyles[":hover"],
            bgcolor: color,
        },
    };
}

export const micButtonStyles = (isRecording) => ({
    ...commonButtonStyles,
    bgcolor: isRecording ? 'green' : 'red',
    ":hover": {
        ...commonButtonStyles[":hover"],
        bgcolor: isRecording ? 'green' : 'red',
    },
});

export const playButtonStyles = makeButtonStyles('blue');
export const transcriptButtonStyles = makeButtonStyles('orange');
export const askButtonStyles = makeButtonStyles('purple');
