import { useCallback, useEffect, useState } from 'react';

export default function useAudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioUrl, setAudioUrl] = useState(null);
    const [recordingStopped, setRecordingStopped] = useState(false);

    const handleDataAvailable = useCallback((e) => {
        console.log("handleDataAvailable", e.data);
        setAudioChunks((prevChunks) => [...prevChunks, e.data]);
    }, []);

    const startRecording = useCallback(async () => {
        if (!mediaRecorder) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const options = { mimeType: 'audio/ogg; codecs=opus' };
            const newMediaRecorder = new MediaRecorder(stream, options);
            setMediaRecorder(newMediaRecorder);
            newMediaRecorder.start();
            console.log('started recording');
        }
    }, [mediaRecorder]);

    const stopRecording = useCallback(() => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log('stopped recording');
            setRecordingStopped(true);
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

    useEffect(() => {
        if (mediaRecorder) {
            mediaRecorder.ondataavailable = handleDataAvailable;
        }
    }, [mediaRecorder, handleDataAvailable]);

    useEffect(() => {
        if (recordingStopped && audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
            setAudioChunks([]);
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
            console.log(audioBlob);
            setRecordingStopped(false);
            setMediaRecorder(null);
        }
    }, [recordingStopped, audioChunks]);

    return { isRecording, toggleRecording, audioUrl };
}
