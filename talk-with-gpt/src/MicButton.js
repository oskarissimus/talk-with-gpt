import React, { useEffect, useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import Button from '@mui/material/Button';

export default function MicButton() {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    const handleDataAvailable = (e) => {
        setAudioChunks((prevChunks) => [...prevChunks, e.data]);
    };

    const handleStop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setAudioChunks([]);
        console.log(audioBlob);
        // Process the audioBlob further, e.g., save it, send it to a server, etc.
    };

    const startRecording = () => {
        mediaRecorder.start();
        console.log('started recording');
    };

    const stopRecording = () => {
        mediaRecorder.stop();
        console.log('stopped recording');
    };

    const handleClick = async () => {
        if (!mediaRecorder) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const newMediaRecorder = new MediaRecorder(stream);
            newMediaRecorder.ondataavailable = handleDataAvailable;
            newMediaRecorder.onstop = handleStop;
            setMediaRecorder(newMediaRecorder);
            setRecording(true);
        } else {
            if (recording) {
                stopRecording();
            } else {
                startRecording();
            }
            setRecording(!recording);
        }
    };

    useEffect(() => {
        if (mediaRecorder && recording) {
            startRecording();
        }
    }, [mediaRecorder]);

    return (
        <Button
            variant="contained"
            sx={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                bgcolor: recording ? 'green' : 'red',
                color: 'white',
                ":hover": {
                    bgcolor: recording ? 'green' : 'red',
                    opacity: 0.6,
                },
            }}
            onClick={handleClick}
        >
            {recording ? (
                <StopIcon sx={{ fontSize: 50 }} />
            ) : (
                <MicIcon sx={{ fontSize: 50 }} />
            )}
        </Button>
    );
}
