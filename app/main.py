
from app.core.config import settings
from app.core.db import ASYNC_DATABASE_URL

print("--- Teste de Configuração ---")
print(f"URL do Banco de Dados: {settings.DATABASE_URL}")
print(f"URL Assíncrona: {ASYNC_DATABASE_URL}")
print("--- Configuração carregada com sucesso! ---")
