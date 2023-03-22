export const getTranscript = async (audioUrl) => {
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
            return data;
        } else {
            console.error('Error transcribing audio:', transcribeResponse.statusText);
        }
    } catch (error) {
        console.error('Error transcribing audio:', error);
    }
};

