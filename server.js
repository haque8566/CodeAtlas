const express = require("express");
const Groq = require("groq-sdk");
const dotenv = require("dotenv");


dotenv.config();
const app = express();

let port = 8080;

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.use(express.json());

app.post("/ask", async (req, res) => {

    try {

        const question = req.body?.question;

        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: question
                }
            ]
        });

        res.json({
            answer: response.choices[0].message.content
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(port,()=>{
        console.log(`app listining on port ${port}`)
});