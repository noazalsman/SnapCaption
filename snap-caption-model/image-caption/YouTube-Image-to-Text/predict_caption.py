from flask import Flask, request, jsonify
from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
import torch
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = VisionEncoderDecoderModel.from_pretrained('nlpconnect/vit-gpt2-image-captioning')
feature_extractor = ViTImageProcessor.from_pretrained('nlpconnect/vit-gpt2-image-captioning')
tokenizer = AutoTokenizer.from_pretrained('nlpconnect/vit-gpt2-image-captioning')

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

max_length = 16
num_beams = 4
gen_kwargs = {'max_length': max_length, 'num_beams': num_beams}

def predict_step(image):
    pixel_values = feature_extractor(images=[image], return_tensors='pt').pixel_values
    pixel_values = pixel_values.to(device)

    output_ids = model.generate(pixel_values, **gen_kwargs)

    preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
    preds = [pred.strip() for pred in preds]
    return preds[0]

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return 'No image file provided', 400
    file = request.files['image'].read()
    try:
        image = Image.open(io.BytesIO(file))
    except IOError:
        return 'Invalid image file', 400

    prediction = predict_step(image)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
