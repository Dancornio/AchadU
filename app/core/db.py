from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings

# 1. Ajusta a URL para o driver assíncrono
# Substitui o protocolo padrão pelo protocolo do asyncpg
str_url = settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

# 2. Remove parâmetros de query incompatíveis (como sslmode)
# O asyncpg não suporta 'sslmode' na URL, então removemos tudo depois do '?'
if "?" in str_url:
    str_url = str_url.split("?")[0]

ASYNC_DATABASE_URL = str_url

# 3. Cria o motor com configuração de SSL explícita
# Passamos 'ssl': 'require' diretamente nos argumentos de conexão
engine = create_async_engine(
    ASYNC_DATABASE_URL,
    connect_args={"ssl": "require"}
)

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