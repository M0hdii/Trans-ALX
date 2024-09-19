const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = 'AIzaSyDG6UNNBQldSGzvGcCZIbkmfAIEirtrc3E';

// Serve static files like styles.css from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle translation requests
app.post('/translate', async (req, res) => {
    const { text, target } = req.body;

    console.log('Received translation request:', { text, target });

    try {
        if (!text || !target) {
            console.error('Missing parameters');
            return res.status(400).json({ error: 'Missing parameters' });
        }

        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2`,
            null,
            {
                params: {
                    q: text,
                    target: target,
                    key: API_KEY
                }
            }
        );

        console.log('Translation response:', response.data);
        res.json({ translatedText: response.data.data.translations[0].translatedText });
    } catch (error) {
        console.error('Error translating text:', error.message || error);
        res.status(500).json({ error: 'Error translating text' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});