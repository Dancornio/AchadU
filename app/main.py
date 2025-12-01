from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, items, upload, admin

app = FastAPI(title="AchadU API")


origins = ["http://localhost:5173", "https://achad-u.vercel.app/"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(items.router, prefix="/api")
app.include_router(upload.router, prefix="/api")
app.include_router(admin.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "API AchadU Online 🚀"}