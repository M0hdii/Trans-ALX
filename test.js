const translate = require('@vitalets/google-translate-api');

async function testTranslation() {
    try {
        const result = await translate('hello', { from: 'en', to: 'es' });
        console.log('Translated text:', result.text);
    } catch (error) {
        console.error('Error:', error);
    }
}

testTranslation();