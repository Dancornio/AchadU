from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from app.services.image_service import upload_image_to_cloudinary
from app.services.auth_service import get_current_user

router = APIRouter(tags=["Upload"])

@router.post("/upload/image")
async def upload_image(
    file: UploadFile = File(...),
    current_user = Depends(get_current_user),
):
    if not file or not getattr(file, "content_type", "").startswith("image/"):
        raise HTTPException(status_code=400, detail="Arquivo deve ser uma imagem")

    url = await upload_image_to_cloudinary(file)
    return {"url": url}
