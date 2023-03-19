import { useCallback, useRef, useState } from 'react';

export default function useAudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const handleDataAvailable = useCallback((e) => {
        audioChunksRef.current.push(e.data);
    }, []);

    const handleStop = useCallback(() => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/ogg; codecs=opus' });
        audioChunksRef.current = [];
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
    }, []);

    const startRecording = useCallback(async () => {
        if (!mediaRecorderRef.current) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const options = { mimeType: 'audio/ogg; codecs=opus' };
            mediaRecorderRef.current = new MediaRecorder(stream, options);
            mediaRecorderRef.current.ondataavailable = handleDataAvailable;
            mediaRecorderRef.current.onstop = handleStop;
        }
        mediaRecorderRef.current.start();
        setIsRecording(true);
    }, [handleDataAvailable, handleStop]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    }, []);

    const toggleRecording = useCallback(() => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }, [isRecording, startRecording, stopRecording]);

    return { isRecording, toggleRecording, audioUrl };
}
