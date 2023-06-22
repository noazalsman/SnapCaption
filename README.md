# SnapCaption

## Overview
SnapCaption is an app developed with Ionic framework using React.js. This application utilizes AI technologies from OpenAI and Hugging Face to intelligently generate catchy captions for your social media posts. 

Whether it's Instagram, LinkedIn, or Facebook, SnapCaption makes it easy for users to come up with engaging captions for their posts by answering a few quick questions and uploading a cover photo.

## Features
- Utilizes OpenAI API for advanced language processing.
- Employs an image recognition AI model from Hugging Face for interpreting image contents.
- Interactive user interface to answer quick questions and upload a cover photo.
- Generates creative and relevant captions for your posts on Instagram, LinkedIn, or Facebook.

## Prerequisites
- Node.js and npm installed.
- Python3 installed.
- Ionic CLI installed.

## Installation
Follow these steps to get the app up and running:


### Step 1: Install Python Dependencies & Run Image Recognition Model
Navigate to the directory containing the `requirements.txt` file and install the necessary Python packages using pip, and run the Python script to get the image recognition model working:

```bash
cd snap-caption-model/image-caption/YouTube-Image-to-Text
pip install -r requirements.txt
python3 predict_caption.py
cd ../../../
```

### Step 2: Install dependencies
```bash
cd snap-caption-app
npm install
```

This will install all the necessary packages and dependencies required by the application.


### Step3: Setup Environment Variables
Create a new file named `.env`. In this file, add your OpenAI key as follows:

```bash
OPENAI_KEY=your_openai_key
```

Please replace `your_openai_key` with your actual OpenAI key.

### Step 4: Start server
Start the Node.js (for openAI calls) server by running the following command:
```bash
npm run start-server
```

### Step 5: Serve Ionic app
Finally, serve the Ionic application using:
```bash
ionic serve
```

Upon successful execution, the application will be available and can be accessed on your local browser at `http://localhost:8100`
