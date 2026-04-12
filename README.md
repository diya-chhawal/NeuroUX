## How to Run This Project Locally

### 1️. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/NeuroUX.git
cd NeuroUX
```

### 2. Setup Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate   # Mac/Linux

pip install fastapi uvicorn numpy pillow matplotlib python-multipart
uvicorn main:app --reload
```
Backend will run at:
http://localhost:8000

### 3. Setup Frontend

```bash
cd frontend/neuroux-ui
npm install
npm run dev
```
Frontend will run at:
http://localhost:3000

### 4. Use the app
- Open http://localhost:3000
- Upload an image
- View:
  + UX metrics
  + Suggestions
  + Heatmap overlay
 
### Important Notes:
- Make sure both backend and frontend are running simultaneously
- Use Python 3.10+
- Ensure ports 8000 (backend) and 3000 (frontend) are free
