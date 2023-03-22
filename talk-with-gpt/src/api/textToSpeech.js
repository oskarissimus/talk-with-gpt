const dataToBase64 = (dataArray) =>
    btoa(String.fromCharCode.apply(null, dataArray));

export const say = async (answer) => {
    const response = await fetch("/text-to-speech", {
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
};