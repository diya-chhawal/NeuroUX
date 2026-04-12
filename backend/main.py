from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from PIL import Image

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
def generate_suggestions(att, vis, load):
    s = []

    if load > 0.5:
        s.append("Reduce clutter in UI")

    if vis < 0.4:
        s.append("Improve visual hierarchy")

    if att < 0.5:
        s.append("Improve layout structure")

    if not s:
        s.append("Good design overall")

    return s


# -------------------------
# HEATMAP GENERATION
# -------------------------


def create_overlay_heatmap(file):
    file.seek(0)

    img = Image.open(file).convert("RGB")
    img = img.resize((256, 256))

    gray = img.convert("L")
    heat = np.array(gray)

    heat = plt.cm.hot(heat / 255.0)[:, :, :3]  # color map
    heat = (heat * 255).astype(np.uint8)

    overlay = (0.6 * np.array(img) + 0.4 * heat).astype(np.uint8)

    plt.imshow(overlay)
    plt.axis("off")

    buf = BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)

    return base64.b64encode(buf.read()).decode()


# -------------------------
# MAIN API
# -------------------------
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    # Simulated brain (replace later with TRIBE)
    brain = np.random.rand(500)

    att = float(brain.mean())
    vis = float(brain[:100].mean())
    load = float(brain.std())

    return {
        "signals": {
            "visual": vis,
            "attention": att,
            "load": load
        },
        "decision": {
            "ux_score": float(0.5*att + 0.3*vis - 0.2*load),
            "suggestions": generate_suggestions(att, vis, load)
        },
        "heatmap": create_overlay_heatmap(file.file)
    }