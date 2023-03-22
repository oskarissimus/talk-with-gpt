const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/transcribe', upload.single('file'), async (req, res) => {
    try {
        const fileName = `uploads/${req.file.filename}.webm`;
        // copy req.file to fileName
        fs.copyFile(req.file.path, fileName, (err) => {
            if (err) throw err;
            console.log('source was copied to destination');
        });

        const resp = await openai.createTranscription(
            fs.createReadStream(fileName),
            "whisper-1"
        );
        console.log(resp.data.text);
        // delete file
        fs.unlink(fileName, (err) => {
            if (err) throw err;
        });
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
        });
        res.json(resp.data.text);


    } catch (error) {
        console.error(error.message);
        console.error(error.stack);

        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/answer', async (req, res) => {
    try {
        console.log(req.body);
        const { question } = req.body;
        // const models = ["gpt-4", "gpt-4-0314", "gpt-4-32k", "gpt-4-32k-0314", "gpt-3.5-turbo", "gpt-3.5-turbo-0301"];
        const model = "gpt-3.5-turbo-0301"
        const completion = await openai.createChatCompletion({
            model: model,
            messages: [{ role: "user", content: question }],
        });
        const answer = completion.data.choices[0].message.content;
        const trimmedAnswer = answer.trim();

        console.log(trimmedAnswer);
        res.json(trimmedAnswer)
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);

        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/text-to-speech', async (req, res) => {
    // use voice pl-PL-Wavenet-A
    try {
        const { text } = req.body;
        const request = {
            input: { text: text },
            voice: { languageCode: 'pl-PL', name: 'pl-PL-Wavenet-B' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        const [response] = await client.synthesizeSpeech(request);
        const audioContent = response.audioContent;
        res.json({ audioContent: audioContent });
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);

        res.status(500).json({ message: 'Server error' });
    }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
