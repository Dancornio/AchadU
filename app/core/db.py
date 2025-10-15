# app/core/db.py

import re
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base

# --- ESTA É A LINHA CORRIGIDA ---
# Importa 'settings' a partir do caminho completo do pacote 'app'
from app.core.config import settings

# O resto do seu código, que está funcional
ASYNC_DATABASE_URL = re.sub(
    r"^postgresql://",
    "postgresql+asyncpg://",
    settings.DATABASE_URL
)

engine = create_async_engine(ASYNC_DATABASE_URL)

SessionLocal = async_sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)

Base = declarative_base()

async def get_db_session():
    async with SessionLocal() as session:
        yield session