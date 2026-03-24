export type Project = {
  id: string;
  title: string;
  impact: string;
  tags: string[];
  featured: boolean;
  projectSlug?: string;
  liveUrl?: string;
  sourceUrl?: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  link?: string;
  outcomes: string[];
};

export const siteContent = {
  identity: {
    name: "Kedar Mane",
    role: "Data Science & Machine Learning",
    headline: "Transforming raw data into meaningful insights and deployable ML models.",
    summary:
      "I am a 3rd-year B.Tech student focused on Data Science and applied Machine Learning. I build data-driven models using real-world datasets, specializing in NLP, computer vision, and predictive analytics.",
    availability: "Actively building data science capabilities through hands-on projects.",
    recruiterCta: "/resume.pdf",
  },
  trustHighlights: [
    "Exploratory Data Analysis",
    "Machine Learning Models",
    "NLP & Computer Vision",
    "FastAPI Deployments",
  ],
  snapshot: [
    { label: "Role Focus", value: "Data Science • Applied ML" },
    { label: "Primary Stack", value: "Python • TensorFlow • Scikit-learn" },
    { label: "Delivery Style", value: "Data-driven, deployable, analytical" },
    { label: "Availability", value: "Open to opportunities" },
  ],
  experience: [
    {
      company: "NullClass",
      role: "Junior Data Science Intern",
      period: "Internship",
      link: "/images/nullclass_internship.jpg",
      outcomes: [
        "Worked on practical data science problems and applied machine learning models.",
        "Gained hands-on experience evaluating and deploying data-driven solutions.",
      ],
    },
    {
      company: "IBM Cognitive Class",
      role: "Data Analysis with Python",
      period: "Certification",
      link: "https://courses.cognitiveclass.ai/certificates/ab3578492ebd43179157ea9c87dc80c8",
      outcomes: [
        "Mastered data analysis techniques and libraries like Pandas and NumPy.",
      ],
    },
    {
      company: "IBM Cognitive Class",
      role: "Machine Learning with Python (Level 1)",
      period: "Certification",
      link: "https://www.credly.com/badges/ac0a529a-756d-4513-a098-121174b58e87/linked_in_profile",
      outcomes: [
        "Earned Credly badge for proficiency in foundational machine learning algorithms.",
      ],
    },
    {
      company: "FreeCodeCamp",
      role: "Machine Learning with Python",
      period: "Certification",
      link: "https://www.freecodecamp.org/certification/kedarmane/machine-learning-with-python-v7",
      outcomes: [
        "Demonstrated working knowledge of deep learning and applied ML workflows.",
      ],
    },
    {
      company: "Eduskill / Google",
      role: "AI-ML Google Workshop Participant",
      period: "Workshop",
      link: "/images/eduskill_cert.jpg",
      outcomes: [
        "Completed AI-ML workshop curriculum encompassing advanced data structures.",
      ],
    },
    {
      company: "Hackathons",
      role: "Participant",
      period: "Ongoing",
      outcomes: [
        "Participated in techfest IIT Bombay Datathon.",
        "Regular participant in competitive college-level Hackathons.",
      ],
    },
  ] as ExperienceItem[],
  projects: [
    {
      id: "LifeScreen-Analytics",
      title: "LifeScreen Analytics",
      impact: "A web application that analyzes smartphone usage patterns and predicts the risk of mobile addiction using machine learning..",
      tags: ["ML", "Data Analysis", "Web App"],
      featured: true,
      projectSlug: "life-screen-analytics",
      sourceUrl: "https://github.com/ked-1823/LifeScreen-Analytics",
    },
    {
      id: "extremist-detection",
      title: "Extremist Detection",
      impact:
        "Built a machine learning-based text classification system to effectively detect extremist content.",
      tags: ["Python", "ML", "Data Science", "Text Classification"],
      featured: true,
      projectSlug: "extremist-detection",
      sourceUrl: "https://github.com/ked-1823/Extremist_detection",
    },
    {
      id: "mental-health-detection",
      title: "Mental Health Detection (Text)",
      impact:
        "Developed a FastAPI and HuggingFace application for automated text identification and mental health classification tasks.",
      tags: ["Python", "NLP", "FastAPI", "HuggingFace"],
      featured: true,
      projectSlug: "mental-health-detection",
      sourceUrl: "https://github.com/ked-1823/text-identification-fastapi-project",
    },
    {
      id: "sleep-quality-prediction",
      title: "Sleep Quality Prediction",
      impact:
        "Created a Random Forest Regression model to predict sleep quality based on daily lifestyle metrics, deployed via FastAPI.",
      tags: ["Python", "ML", "Regression", "FastAPI"],
      featured: true,
      projectSlug: "sleep-quality-prediction",
      sourceUrl: "https://github.com/ked-1823/Sleep-quality-ui-using-fastapi",
    },
    {
      id: "car-color-detection",
      title: "Car Color Detection",
      impact:
        "Implemented a YOLO-based computer vision model to detect cars dynamically and classify their colors in images/video.",
      tags: ["ML", "Computer Vision", "YOLO"],
      featured: true,
      projectSlug: "car-color-detection",
      sourceUrl: "https://github.com/ked-1823/car_color_detection",
    },
    {
      id: "sentiment-analysis",
      title: "Sentiment Analysis",
      impact: "Machine learning model to analyze sentiment in text data.",
      tags: ["ML", "NLP"],
      featured: false,
      projectSlug: "sentiment-analysis",
      sourceUrl: "https://github.com/ked-1823/sentiment-analysis",
    },
    {
      id: "cat-dog-classifier",
      title: "Cat or Dog Classifier",
      impact: "CNN-based image classifier to automatically categorize images as either cats or dogs.",
      tags: ["ML", "Computer Vision"],
      featured: false,
      projectSlug: "cat-dog-classifier",
      sourceUrl: "https://github.com/ked-1823/cat-or-dog-identification",
    },
    {
      id: "clickbait-detector",
      title: "Clickbait Detector",
      impact: "Built a machine learning model to effectively detect clickbait headlines in news and articles.",
      tags: ["ML", "NLP"],
      featured: false,
      projectSlug: "clickbait-detector",
      sourceUrl: "https://github.com/ked-1823/clickbait-detector-project",
    },
    {
      id: "is-criminal",
      title: "Is-Criminal Text Classification",
      impact: "A text classification project that predicts whether a given news article or text is related to criminal activity.",
      tags: ["ML", "NLP"],
      featured: false,
      projectSlug: "is-criminal",
      sourceUrl: "https://github.com/ked-1823/is-criminal-mini-project",
    },
    {
      id: "ipl-data-analysis",
      title: "IPL Data Analysis",
      impact: "Exploratory Data Analysis of IPL matches and historical player performance statistics.",
      tags: ["ML", "Data Analysis"],
      featured: false,
      projectSlug: "ipl-data-analysis",
      sourceUrl: "https://github.com/ked-1823/ipl-data-analysis",
    },
  ] as Project[],
  about: {
    description:
      "I believe in the power of data to uncover hidden patterns and drive decisions. My approach to Machine Learning balances model accuracy with real-world practicality, ensuring the solutions I build are understandable and easy to deploy.",
    workingStyle: [
      "Understand the data deeply before modeling.",
      "Prefer clean, explainable models when possible.",
      "Ship complete solutions, bridging ML with web APIs.",
    ],
    strengths: [
      "Data Analysis (Pandas, NumPy)",
      "Model Training (Scikit-Learn, TF)",
      "API Deployment (FastAPI, Flask)",
      "Data Visualization (Matplotlib, Seaborn)",
    ],
  },
  contact: {
    email: "manekedar287@gmail.com",
    responseTime: "Usually replies within 24 hours.",
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/kedarmane18" },
      { label: "GitHub", href: "https://github.com/ked-1823" },
      { label: "Kaggle", href: "https://www.kaggle.com/kedarnathmane" },
      { label: "LeetCode", href: "https://leetcode.com/u/kedar1823/" },
      { label: "Twitter", href: "https://www.x.com/kedar1823" },
    ],
  },
};
