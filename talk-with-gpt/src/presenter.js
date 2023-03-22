import { useCallback } from 'react';

export const useHandleMicButtonClick = (isRecording, toggleRecording) => {
    const handleClick = useCallback(() => {
        toggleRecording();
    }, [toggleRecording]);

    return handleClick;
};

export const useHandleTranscriptButtonClick = (
    audioUrl,
    setTranscriptedText,
    setIsTranscribing
) => {
    const handleClick = useCallback(async () => {
        setIsTranscribing(true);
        try {
            const response = await fetch(audioUrl);
            const audioBlob = await response.blob();
            const formData = new FormData();
            formData.append('file', new File([audioBlob], 'audio.webm', { type: 'audio/webm' }));

            const transcribeResponse = await fetch('/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (transcribeResponse.ok) {
                const data = await transcribeResponse.json();
                console.log('transcripted text:', data);
                setTranscriptedText(data);
                setIsTranscribing(false);
            } else {
                console.error('Error transcribing audio:', transcribeResponse.statusText);
            }
        } catch (error) {
            console.error('Error transcribing audio:', error);
        }
    }, [audioUrl, setTranscriptedText, setIsTranscribing]);

    return handleClick;
};

export const useHandleAskButtonClick = (
    transcriptedText,
    setAnswer,
    setIsAsking
) => {
    const handleClick = useCallback(async () => {
        setIsAsking(true);

        try {
            const response = await fetch('/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: transcriptedText }),
            });

            if (response.ok) {
                const data = await response.json();
                setAnswer(data);
                setIsAsking(false);
            } else {
                console.error('Error getting answer:', response.statusText);
            }
        } catch (error) {
            console.error('Error getting answer:', error);
        }
    }, [transcriptedText, setAnswer, setIsAsking]);

    return handleClick;
};
const dataToBase64 = (dataArray) =>
    btoa(String.fromCharCode.apply(null, dataArray));
export const useHandleSayAnswerButtonClick = (answer) => {
    const handleClick = useCallback(async () => {
        const response = await fetch("http://localhost:5000/text-to-speech", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: answer }),
        });

        const data = await response.json();
        const base64Data = dataToBase64(data.audioContent.data);

        const audio = new Audio();
        audio.src = `data:audio/mp3;base64,${base64Data}`;
        audio.play();
    }, [answer]);

    return handleClick;
};

export const useHandlePlayButtonClick = (audioUrl) => {
    const handleClick = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    return handleClick;
};
