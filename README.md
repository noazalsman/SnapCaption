# SnapCaption

## Overview
SnapCaption is an app developed with Ionic framework using React.js. This application utilizes AI technologies from OpenAI and Hugging Face to intelligently generate catchy captions for your social media posts. 

Whether it's Instagram, LinkedIn, or Facebook, SnapCaption makes it easy for users to come up with engaging captions for their posts by answering a few quick questions and uploading a cover photo.

## Features
- Utilizes OpenAI API for advanced language processing.
- Employs an image recognition AI model from Hugging Face for interpreting image contents.
- Interactive user interface to answer quick questions and upload a cover photo.
- Generates creative and relevant captions for your posts on Instagram, LinkedIn, or Facebook.
- This app uses firebase by google for analytics and event data.

## Prerequisites
- Node.js and npm installed.
- Python3 installed.
- Ionic CLI installed. (npm install -g @ionic/cli)
- OpenAI API key.

## Installation
Follow these steps to get the app up and running:


### Step 1: Install Python Dependencies & Run Image Recognition Model
Create and activate a python venv:

```bash
cd SnapCaption/snap-caption-model
python3 -m venv venv
source venv/bin/activate  #for mac
```

Navigate to the directory containing the `requirements.txt` file and install the necessary Python packages using pip:

```bash
cd image-caption/YouTube-Image-to-Text
pip install -r requirements.txt
```

Next, run the Python script to get the image recognition model working:

```bash
python predict_caption.py
```

### Step 2: Install dependencies
In a new terminal, navigate to the `snap-caption-app` directory and install the dependencies using npm:

```bash
cd snap-caption-app
npm install
```

### Step3: Setup Environment Variables
Create a new file named `.env`. In this file, add your OpenAI key as follows:

```bash
echo OPENAI_KEY=your_openai_key > .env
```

Please replace `your_openai_key` with your actual OpenAI key.

### Step 4: Start server
Start the Node.js server by running the following command:
```bash
node open-ai-server.js
```

### Step 5: Serve Ionic app
Finally, in another terminal, serve the Ionic application using:
```bash
cd snap-caption-app
ionic serve
```

Upon successful execution, the application will be available and can be accessed on your local browser at `http://localhost:8100`
