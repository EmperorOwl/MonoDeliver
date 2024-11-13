const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient();

async function convertText(req) {
    const request = {
        input: { text: req.text },
        voice: { languageCode: req.language, ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
    };
    const res = await client.synthesizeSpeech(request);
    return res[0];
}

module.exports = { convertText };
