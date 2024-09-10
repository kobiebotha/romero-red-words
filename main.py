from flask import Flask, render_template, jsonify, send_file
import random
from gtts import gTTS
import os
import tempfile

app = Flask(__name__)

# Sample list of words for kindergartners
words = [
    "the", "was", "is", "a", "on", "and", "to", "for", "go", "I", 
    "like", "of", "will", "said", "want", "with", "you", "in", 
    "put", "see", "stop", "from", "off", "he", "has", "have", 
    "me", "his", "as", "my", "into", "now", "new", "give", "or", "by", 
    "went", "do", "are", "they", "any", "black", "blue", "brown", 
    "gray", "green", "orange", "purple", "white", "yellow", "come", 
    "one", "two"
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_word')
def get_word():
    word = random.choice(words)
    return jsonify({'word': word})

@app.route('/get_audio/<word>')
def get_audio(word):
    tts = gTTS(text=word, lang='en')
    
    # Create a temporary file to store the audio
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
        tts.save(temp_audio.name)
        temp_audio_path = temp_audio.name

    return send_file(temp_audio_path, mimetype="audio/mpeg")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
