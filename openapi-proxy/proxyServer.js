const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/transcribe', upload.single('file'), async (req, res) => {
    try {
        const fileName = `uploads/${req.file.filename}.webm`;
        // copy req.file to fileName
        fs.copyFile(req.file.path, fileName, (err) => {
            if (err) throw err;
            console.log('source was copied to destination');
        });

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
