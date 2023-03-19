import { useCallback, useEffect, useState } from 'react';

export default function useAudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    const handleDataAvailable = useCallback((e) => {
        setAudioChunks((prevChunks) => [...prevChunks, e.data]);
    }, []);

    const handleStop = useCallback(() => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setAudioChunks([]);
        console.log(audioBlob);
        // Process the audioBlob further, e.g., save it, send it to a server, etc.
    }, [audioChunks]);

    const startRecording = useCallback(async () => {
        if (!mediaRecorder) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const newMediaRecorder = new MediaRecorder(stream);
            newMediaRecorder.ondataavailable = handleDataAvailable;
            newMediaRecorder.onstop = handleStop;
            setMediaRecorder(newMediaRecorder);
            newMediaRecorder.start();
            console.log('started recording');
        }
    }, [mediaRecorder, handleDataAvailable, handleStop]);

    const stopRecording = useCallback(() => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log('stopped recording');
            setMediaRecorder(null);
        }
    }, [mediaRecorder]);

    const toggleRecording = useCallback(() => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsRecording(!isRecording);
    }, [isRecording, startRecording, stopRecording]);

    return { isRecording, toggleRecording };
}
