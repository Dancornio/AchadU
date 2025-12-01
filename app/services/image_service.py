import cloudinary
import cloudinary.uploader

from fastapi import UploadFile, HTTPException
from starlette.concurrency import run_in_threadpool

from app.core.config import settings

# Configuração do Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)

async def upload_image_to_cloudinary(file: UploadFile) -> str:
    """
    Recebe um arquivo do FastAPI, envia para o Cloudinary e retorna a URL segura.
    Executa o upload em thread pool para não bloquear o event loop.
    """
    try:
        result = await run_in_threadpool(
            lambda: cloudinary.uploader.upload(
                file.file,
                folder="achadu",
                resource_type="image",
            )
        )
        url = result.get("secure_url")
        if not url:
            raise HTTPException(status_code=500, detail="Upload não retornou URL")
        return url
    except Exception as e:
        print(f"Erro no upload: {e}")
        raise HTTPException(status_code=500, detail="Falha ao fazer upload da imagem")
