const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const predefinedPrompts = [
    'Enhance the generated CV using existing information with better grammar and sentence structure. Dont increase the word count. Keep the format in JSON.',
    'Improve the punctuation and word usage in the generated CV. Dont increase the word count. Keep the format in JSON.',
];

const openai = new OpenAIApi(config);
app.use(cors());
app.use(bodyParser.json());
const mockCVData = [
    {
        "name": "Fiona Wenhan Zhao",
        "email": "wenhanzhao8890@gmail.com",
        "socialMedia": {
            "linkedin": "",
            "twitter": "",
            "github": ""
        },
        "professionalExperience": [
            {
                "title": "Founder",
                "company": "UNIQUE BUNNY",
                "location": "Winnipeg, Canada",
                "startDate": "2014-01-01",
                "endDate": "Present",
                "points": [
                    "Founder and GM of the largest chain boutique in Manitoba that specializes in Japanese & Korean beauty and lifestyle products",
                    "Managed 3 brick-n-mortars and online store with $5Mn+ GMV and $1Mn+ annual revenue & $1.2M free cash flow in 2021",
                    "Created an inventory of X+ products ranging from X categories resulting in a YoY revenue growth of X%",
                    "Improved the customer retention rate by X% by supervising 15 store staff and developing customer service training manuals, teaching product features and selling points",
                    "Performed inventory analysis and improved stock-forecasting mechanism by X% by communicating with vendors, couriers, and Canadian Border Services Agency to ensure on-time, complete delivery of products",
                    "Conducted product-mix optimization drives to analyze consumer behavior and accordingly founded X best-selling products",
                    "Collaborated with X+ marketing firms to run online advertising and in-store marketing by allocating a total budget of X$",
                    "Led the digital transformation of the company by designing and launching the official website that has X MAU",
                    "Managed the company’s social media presence across X platforms by actively posting promotions, blogs, and new products; Accumulated 15k+ followers across multiple platforms"
                ]
            },
            {
                "title": "Boarding Advisor",
                "company": "ST. JOHNS - RAVENSCOURT SCHOOL",
                "location": "Winnipeg, Canada",
                "startDate": "2016-01-01",
                "endDate": "2020-12-31",
                "points": [
                    "Designed & executed efficient study programs; Improved student results by X%",
                    "Mentored 30+ international boarding students, providing each student with peer mentorship sessions to help students adjust to the boarding school environment and improve their academic and social performances",
                    "Planned and executed X stimulating programs and activities, connecting students to the Winnipeg community at large and providing students with a deeper understanding of the Canadian culture"
                ]
            },
            {
                "title": "Counter Manager",
                "company": "HUDSON’S BAY COMPANY",
                "location": "Winnipeg, Canada",
                "startDate": "2013-01-01",
                "endDate": "2014-12-31",
                "points": [
                    "Managed the Clarins Paris counter at the Hudson’s Bay Company – Winnipeg flagship, achieving 30% revenue increase",
                    "Awarded as the Top Sales Associate of the Month – Three times",
                    "Created a client & store management SOP that enhanced the customer experience by offering professional consultations to X+ customers; Efforts yielded strong customer satisfaction, earning recognition from Clarins HQ",
                    "Built a clientele of X+ customers by promoting the products on social media platforms"
                ]
            }
        ],
        "skills": [
            "Digital Marketing",
            "Inventory Management",
            "Customer Service",
            "Data Analysis",
            "Social Media Management"
        ],
        "education": [
            {
                "degree": "Bachelor of Arts",
                "major": "Women and Gender Studies",
                "university": "UNIVERSITY OF WINNIPEG",
                "location": "Winnipeg, Canada",
                "completionYear": 2022
            }
        ],
        'projects':[],
        "languages": ["English", "Mandarin"],
        "certifications": [],
        "interests": [
            "Entrepreneurship",
            "Fashion",
            "Blogging"
        ]
    }
]
const mockUserData = [
    {
        "name": "Aarya Tiwari",
        "location": "Mumbai, Maharashtra",
        "phoneNumber": "+91 7021875752",
        "email": "aarya.tiwari@somaiya.edu",
        "education": [
            {
                "university": "KJ SOMAIYA COLLEGE OF ENGINEERING",
                "location": "Mumbai, Maharashtra",
                "degree": "Bachelor of Technology",
                "major": "Information Technology; Honors in Artificial Intelligence",
                "startDate": "2021-01-01",
                "endDate": "2025-12-31",
                "cumulativeGPA": "9.4/10",
                "relevantCoursework": [
                    "Software Engineering",
                    "Operating Systems",
                    "Algorithms",
                    "Artificial Intelligence",
                    "Full-Stack Web Development",
                    "Data Structures"
                ]
            },
            {
                "university": "RAO JUNIOR COLLEGE OF SCIENCE",
                "location": "Mumbai, Maharashtra",
                "degree": "IIT-JEE Preparation Coaching",
                "percentage": "95.17%",
                "startDate": "2019-01-01",
                "endDate": "2021-12-31"
            }
        ],
        "workExperience": [
            {
                "company": "MENTOR-MENTEE INTERNSHIP",
                "location": "Mumbai, Maharashtra",
                "position": "Intern (Group Leader)",
                "startDate": "2022-09-01",
                "endDate": "Present",
                "responsibilities": [
                    "Led a team of 5 members to design and implement a Keyword Extraction Tool.",
                    "Implemented Technologies like Django, NumPy, Pandas, Matplotlib along with Algorithms like RAKE, TF-IDF."
                ]
            }
        ],
        "projects": [
            {
                "name": "SRAJ.CO – FASHION ECOMMERCE",
                "startDate": "2023-04-01",
                "description": "Designed and developed a traditional fashion E-commerce website named SRAJ.",
                "technologies": [
                    "React",
                    "Redux",
                    "Mapbox",
                    "Firestore"
                ]
            },
            {
                "name": "KEYWORD EXTRACTION TOOL",
                "startDate": "2022-09-01",
                "description": "Designed and developed an NLP model which extracts abstract topics from a given piece of text",
                "technologies": [
                    "Django",
                    "NumPy",
                    "Pandas",
                    "Matplotlib",
                    "RAKE",
                    "TF-IDF"
                ]
            },
            {
                "name": "WAREHOUSE MANAGEMENT SYSTEM",
                "startDate": "2023-02-01",
                "description": "Designed and developed a Warehouse Management System which keeps track of the stock, imports, exports.",
                "technologies": [
                    "Django",
                    "Charts.js",
                    "Postgres SQL"
                ]
            },
            {
                "name": "FACEBOOK DATA FETCHER",
                "startDate": "2023-05-01",
                "description": "Designed and Implemented A website which allows you to manage the messages and posts on your FB Page",
                "technologies": [
                    "React",
                    "Graph API (Facebook)"
                ]
            }
        ],
        "skills": [
            "C/C++ Programming",
            "Python Programming",
            "HTML/CSS/JAVASCRIPT",
            "REACT JS",
            "DJANGO / DJANGO REST",
            "MONGODB",
            "EXPRESS JS",
            "NODE JS",
            "POSTGRES SQL",
            "MYSQL",
            "GIT/GITHUB",
            "FIREBASE",
            "NUMPY, PANDAS, MATPLOTLIB",
            "DSA"
        ],
        "languages": [
            "English",
            "Hindi"
        ]
    }
]



async function getCompletion(prompt, mockData) {
    const promptWithReferences =  `${mockData} \n\n use the format given above and improve my CV below: ${mockUserData}  \n  \n\n ${prompt} `;
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 2000,
        temperature: 0,
        prompt: promptWithReferences,
    });
    return completion.data.choices[0].text;
}

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    // Run the user's prompt
    let responseText = await getCompletion(prompt, mockCVData);

    // Parse the response text to JSON
    let mockData;
    try {
        mockData = JSON.parse(responseText);
        console.log('mockData: ', mockData)
    } catch (error) {
        console.log('Error parsing response text to JSON:', error);
    }

    // Run the predefined prompts, using the response from the previous prompt as the new prompt
    for (let i = 0; i < predefinedPrompts.length; i++) {
        responseText = await getCompletion(`${responseText}\n${predefinedPrompts[i]}`, responseText);

        // Update mockData with the new response text
        try {
            mockData = JSON.parse(responseText);
            console.log('mockData: ', mockData)
        } catch (error) {
            console.log('Error parsing response text to JSON:', error);
        }
    }

    const response = {
        text: responseText,
    };

    res.json(response);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

