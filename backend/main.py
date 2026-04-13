from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from PIL import Image
import cv2
import base64

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# SUGGESTIONS ENGINE
# -------------------------
def interpret_signals(attention, visual, load):
    suggestions = []

    if load > 0.6:
        suggestions.append("Reduce clutter")

    if attention < 0.4:
        suggestions.append("Increase contrast")

    if visual < 0.4:
        suggestions.append("Improve brightness")

    return suggestions


# -------------------------
# HEATMAP GENERATION
# -------------------------


def generate_heatmap(file_bytes):
    # Convert bytes → numpy image
    np_arr = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_GRAYSCALE)

    # Edge detection (attention)
    edges = cv2.Canny(img, 100, 200)

    # Convert to colored heatmap
    heatmap = cv2.applyColorMap(edges, cv2.COLORMAP_JET)

    # Encode to base64
    _, buffer = cv2.imencode(".png", heatmap)
    heatmap_base64 = base64.b64encode(buffer).decode("utf-8")

    return heatmap_base64



def normalize(x):
    return max(0, min(1, float(x)))
# -------------------------
# MAIN API
# -------------------------
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    # Simulated brain (replace later with TRIBE)
    file_bytes = await file.read()

# PIL for signals
    img = Image.open(BytesIO(file_bytes)).convert("L")
    img_array = np.array(img)  

    img_array=img_array/255.0

    vis = np.mean(img_array)
    edges = cv2.Canny((img_array * 255).astype(np.uint8), 100, 200)
    att = np.sum(edges > 0) / edges.size
    att = att * 9  # amplify signal
    att = normalize(att)
    load = np.std(edges / 255.0)
    load = load * 2
    load = normalize(load)

    vis=normalize(vis)

    ux_score=(0.5*att + 0.3*vis - 0.2*load)
    ux_score=normalize(ux_score)

    return {
        "signals": {
            "visual": vis,
            "attention": att,
            "load": load
        },
        "decision": {
            "ux_score": ux_score,
            "suggestions": interpret_signals(att, vis, load)
        },
        "heatmap": generate_heatmap(file_bytes)
    }