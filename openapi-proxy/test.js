require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');


async function main() {
    const audiFileRelativePath = "uploads/c8e9a287bdead6d971bbfea5bf369e16.webm";
    const audiFilePath = `${__dirname}/${audiFileRelativePath}`;
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const resp = await openai.createTranscription(
        fs.createReadStream(audiFilePath),
        "whisper-1"
    );
    console.log(resp.data.text);
}

main()