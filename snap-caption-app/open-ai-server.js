import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get your OpenAI API key
const openaiKey = process.env.OPENAI_KEY;

app.post('/generate_caption', async (req, res) => {
    const data = req.body;

    // Get the input data
    const { social_media, tone, key_words, names, places, photo_description } = data;

    // Examples for the GPT model
    const examples = [
        "A friendly social media post on Facebook about a delicious dinner with friends at a restaurant. Caption: 'Such a fantastic night with great friends at the best restaurant in town. Can't wait to do this again! #friends #dinner #goodtimes'",
        "A professional social media post on LinkedIn about a successful business meeting. Caption: 'Thrilled to share the success of a highly productive business meeting we recently convened. The synergy between our cross-functional teams led to innovative strategies and customer-centric solutions for the upcoming quarter. The robust exchange of ideas and collaborative spirit was inspirational, resulting in a clear, actionable roadmap. Looking forward to seeing our vision come to life in the coming months. #Teamwork #Strategy #Innovation",
        "A funny Instagram post about a cute cat doing something silly. Caption: 'When your cat thinks it's Monday... #catlife #funnycat #mondays'"
    ];

    // Concatenate examples with the new prompt
    const prompt = examples.join("\n\n") + `\n\nA ${tone} social media post on ${social_media} with key words: ${key_words}, mentioning names: ${names} and places: ${places}, about photo: ${photo_description}. Caption: `;

    // Generate the response
    const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 100,
        n: 3
    }, {
        headers: {
            'Authorization': `Bearer ${openaiKey}`
        }
    });

    const captions = response.data.choices.map(choice => choice.text.trim().replace(/["'\\]/g, ''));

    res.json({ captions: captions });
});

app.post('/generate_similar_captions', async (req, res) => {
    const data = req.body;

    // Get the input data
    const { user_caption } = data;

    // Add some common caption styles as examples for GPT-4
    const examples = [
        "Original caption: 'Great meeting yesterday! The students showed great progress in their projects and kept moving forward with the good work. We also had a great lecture from our guest speaker, Roei Dimi who enriched our knowledge about software architecture. 💯✔️ #students #work #projects #developer' Similar caption: 'Fantastic gathering yesterday! Our students demonstrated significant advancement in their tasks, persistently driving forward with their excellent efforts.We were also privileged to have a thought-provoking talk from our special guest, Roei Dimi, who expanded our understanding in the field of software architecture. Absolutely stellar! 🌟✔️ #students #dedication #projects #softwaredevelopment'",
        "Original caption: 'Exciting news! 📣 This week we wrapped up our 3rd official CLYF workshop for international school students, with over 60 participants eager to learn about personal finance management. From budgeting to goal-setting, we covered it all. Stay tuned for more workshops like this to come!✨ #CLYF #personalfinance #financialliteracy #education #studentsuccess' Similar caption: 'Thrilling update! 📣 We have just completed our 4th landmark CLYF workshop for global school students, attracting more than 70 curious minds keen on mastering the art of personal finance management. From savings strategies to understanding investments, we left no stone unturned. Keep an eye out for more of such insightful workshops in the future!✨ #CLYF #personalfinance #financialawareness #education #studentempowerment'",
        "Original caption: 'Trying out a new recipe today.' Similar caption: 'Whipping up something new in the kitchen.'"
    ];

    // Concatenate examples with the new prompt
    const prompt = examples.join("\n\n") + `\n\nOriginal caption: '${user_caption}' Similar captions: `;

    // Generate the response
    const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 100,
        n: 3
    }, {
        headers: {
            'Authorization': `Bearer ${openaiKey}`
        }
    });

    const similar_captions = response.data.choices.map(choice => choice.text.trim().replace(/["'\\]/g, ''));

    res.json({ similar_captions: similar_captions });
});

app.listen(5000, '0.0.0.0', () => {
    console.log('Server started on port 5000');
});