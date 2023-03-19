import React, { useEffect, useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import Button from '@mui/material/Button';

export default function MicButton() {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    const handleClick = async () => {
        if (!mediaRecorder) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const newMediaRecorder = new MediaRecorder(stream);
            setMediaRecorder(newMediaRecorder);
        } else {
            if (recording) {
                mediaRecorder.stop();
            } else {
                mediaRecorder.start();
            }
            setRecording(!recording);
        }
    };

    useEffect(() => {
        if (mediaRecorder) {
            mediaRecorder.ondataavailable = (e) => {
                setAudioChunks((prevChunks) => [...prevChunks, e.data]);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                setAudioChunks([]);
                // Process the audioBlob further, e.g., save it, send it to a server, etc.
            };
        }
    }, [mediaRecorder]);

    return (
        <Button
            variant="contained"
            sx={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                bgcolor: 'red',
                color: 'white',
                ":hover": {
                    bgcolor: 'red',
                    opacity: 0.6,
                },
            }}
            onClick={handleClick}
        >
            <MicIcon sx={{ fontSize: 50 }} />
        </Button>
    );
}
