from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.db import get_db_session
from app.schemas.item_schemas import ItemCreate, ItemResponse, ItemStatus
from app.repositories.item_repository import ItemRepository

router = APIRouter(tags=["Itens"])

@router.post("/items", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
async def create_item(
    item: ItemCreate, 
    db: AsyncSession = Depends(get_db_session)
):
    repo = ItemRepository(db)
    return await repo.create(item)

@router.get("/items", response_model=List[ItemResponse])
async def list_items(
    status: ItemStatus = None,
    skip: int = 0, 
    limit: int = 50, 
    db: AsyncSession = Depends(get_db_session)
):
    repo = ItemRepository(db)
    return await repo.get_all(status=status, skip=skip, limit=limit)

@router.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(
    item_id: int, 
    db: AsyncSession = Depends(get_db_session)
):
    repo = ItemRepository(db)
    item = await repo.get_by_id(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    return item