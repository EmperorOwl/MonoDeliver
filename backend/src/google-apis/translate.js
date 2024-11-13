const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate();

async function translateText(req) {
    const res = await translate.translate(req.text, req.language);
    return res[0];
}

module.exports = { translateText };
