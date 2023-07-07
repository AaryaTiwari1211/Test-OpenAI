const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();



const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);
app.use(cors());
app.use(bodyParser.json());
const mockCVData = [
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "socialMedia": {
            "linkedin": "https://www.linkedin.com/in/johndoe",
            "twitter": "https://twitter.com/johndoe",
            "github": "https://github.com/johndoe"
        },
        "professionalExperience": [
            {
                "title": "Software Engineer",
                "company": "ABC Inc.",
                "location": "City, Country",
                "startDate": "2018-01-01",
                "endDate": "2022-12-31",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra nulla id ipsum consectetur consequat."
            },
            {
                "title": "Intern",
                "company": "XYZ Corp.",
                "location": "City, Country",
                "startDate": "2017-06-01",
                "endDate": "2017-12-31",
                "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            }
        ],
        "skills": [
            "JavaScript",
            "Python",
            "HTML/CSS",
            "React",
            "Node.js",
            "Database Management",
            "Project Management"
        ],
        "education": [
            {
                "degree": "Bachelor of Science",
                "major": "Computer Science",
                "university": "University Name",
                "location": "City, Country",
                "completionYear": 2017
            },
            {
                "degree": "High School Diploma",
                "major": "Science",
                "school": "School Name",
                "location": "City, Country",
                "completionYear": 2013
            }
        ],
        "hobbies": [
            "Reading",
            "Playing Guitar",
            "Traveling",
            "Photography"
        ],
        "additionalDetails": {
            "languages": ["English", "Spanish"],
            "certifications": [
                "Certified Scrum Master",
                "AWS Certified Developer"
            ],
            "interests": [
                "Machine Learning",
                "Web Development",
                "Data Visualization"
            ]
        }
    },
    {
        "name": "Jane Smith",
        "email": "janesmith@example.com",
        "socialMedia": {
            "linkedin": "https://www.linkedin.com/in/janesmith",
            "twitter": "https://twitter.com/janesmith",
            "github": "https://github.com/janesmith"
        },
        "professionalExperience": [
            {
                "title": "Web Developer",
                "company": "XYZ Corp.",
                "location": "City, Country",
                "startDate": "2019-01-01",
                "endDate": "2022-06-30",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ante a tellus aliquet, at tincidunt dolor venenatis."
            },
            {
                "title": "Intern",
                "company": "ABC Inc.",
                "location": "City, Country",
                "startDate": "2018-06-01",
                "endDate": "2018-12-31",
                "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            }
        ],
        "skills": [
            "HTML/CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Database Management",
            "UI/UX Design",
            "Project Management"
        ],
        "education": [
            {
                "degree": "Bachelor of Engineering",
                "major": "Computer Science",
                "university": "University Name",
                "location": "City, Country",
                "completionYear": 2018
            },
            {
                "degree": "High School Diploma",
                "major": "Science",
                "school": "School Name",
                "location": "City, Country",
                "completionYear": 2014
            }
        ],
        "hobbies": [
            "Reading",
            "Traveling",
            "Photography",
            "Hiking"
        ],
        "additionalDetails": {
            "languages": ["English", "French"],
            "certifications": [
                "AWS Certified Developer",
                "Google Analytics Certified"
            ],
            "interests": [
                "Web Development",
                "Data Science",
                "Mobile App Development"
            ]
        }
    },
    {
        "name": "David Johnson",
        "email": "davidjohnson@example.com",
        "socialMedia": {
            "linkedin": "https://www.linkedin.com/in/davidjohnson",
            "twitter": "https://twitter.com/davidjohnson",
            "github": "https://github.com/davidjohnson"
        },
        "professionalExperience": [
            {
                "title": "Software Developer",
                "company": "ABC Inc.",
                "location": "City, Country",
                "startDate": "2017-01-01",
                "endDate": "2021-12-31",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices nisl et ligula consectetur vulputate."
            },
            {
                "title": "IT Intern",
                "company": "XYZ Corp.",
                "location": "City, Country",
                "startDate": "2016-06-01",
                "endDate": "2016-12-31",
                "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            }
        ],
        "skills": [
            "Java",
            "C++",
            "Python",
            "SQL",
            "JavaScript",
            "Software Testing",
            "Agile Methodologies"
        ],
        "education": [
            {
                "degree": "Master of Science",
                "major": "Computer Science",
                "university": "University Name",
                "location": "City, Country",
                "completionYear": 2016
            },
            {
                "degree": "Bachelor of Engineering",
                "major": "Electronics",
                "university": "University Name",
                "location": "City, Country",
                "completionYear": 2014
            }
        ],
        "hobbies": [
            "Playing Soccer",
            "Reading Books",
            "Cooking",
            "Gardening"
        ],
        "additionalDetails": {
            "languages": ["English", "German"],
            "certifications": [
                "Oracle Certified Java Programmer",
                "ISTQB Certified Tester"
            ],
            "interests": [
                "Software Development",
                "Machine Learning",
                "Data Analysis"
            ]
        }
    },
    {
        "name": "Emily Davis",
        "email": "emilydavis@example.com",
        "socialMedia": {
            "linkedin": "https://www.linkedin.com/in/emilydavis",
            "twitter": "https://twitter.com/emilydavis",
            "github": "https://github.com/emilydavis"
        },
        "professionalExperience": [
            {
                "title": "Frontend Developer",
                "company": "ABC Inc.",
                "location": "City, Country",
                "startDate": "2019-01-01",
                "endDate": "2022-12-31",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra nulla id ipsum consectetur consequat."
            },
            {
                "title": "Intern",
                "company": "XYZ Corp.",
                "location": "City, Country",
                "startDate": "2018-06-01",
                "endDate": "2018-12-31",
                "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            }
        ],
        "skills": [
            "HTML/CSS",
            "JavaScript",
            "React",
            "Angular",
            "UI/UX Design",
            "Responsive Web Design",
            "Cross-Browser Testing"
        ],
        "education": [
            {
                "degree": "Bachelor of Science",
                "major": "Computer Science",
                "university": "University Name",
                "location": "City, Country",
                "completionYear": 2018
            },
            {
                "degree": "High School Diploma",
                "major": "Science",
                "school": "School Name",
                "location": "City, Country",
                "completionYear": 2014
            }
        ],
        "hobbies": [
            "Drawing",
            "Playing Piano",
            "Photography",
            "Yoga"
        ],
        "additionalDetails": {
            "languages": ["English", "German"],
            "certifications": [
                "Oracle Certified Java Programmer",
                "ISTQB Certified Tester"
            ],
            "interests": [
                "Software Development",
                "Machine Learning",
                "Data Analysis"
            ]
        }
    }
]


app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
    const promptWithReferences = `${JSON.stringify(mockCVData)}\n${prompt}`;
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 700,
        temperature: 0,
        prompt: promptWithReferences,
    });
    console.log(completion.data);
    const response = {
        text: completion.data.choices[0].text,
    };
    res.json(response);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
