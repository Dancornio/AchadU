import bcrypt
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.config import settings
from app.models.user_models import User

# --- Funções de Senha (Agora usando bcrypt diretamente) ---

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se a senha em texto plano corresponde ao hash.
    O bcrypt exige bytes, então convertemos as strings.
    """
    return bcrypt.checkpw(
        plain_password.encode('utf-8'),
        hashed_password.encode('utf-8')
    )

def get_password_hash(password: str) -> str:
    """
    Gera um hash seguro para a senha.
    Retorna uma string para ser salva no banco de dados.
    """
    # Gera o salt e o hash
    hashed_bytes = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    # Decodifica para string para armazenar no banco (PostgreSQL VARCHAR)
    return hashed_bytes.decode('utf-8')

# --- Funções de Token (JWT) - Permanece igual ---

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

async def authenticate_user(db: AsyncSession, email: str, password: str):
    # 1. Busca o usuário no banco de dados
    result = await db.execute(select(User).filter(User.email == email))
    user = result.scalars().first()

    if not user:
        return False
    
    # 2. Verifica a senha usando a nova implementação direta
    if not verify_password(password, user.password_hash):
        return False
    
    return user