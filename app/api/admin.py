from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from app.core.db import get_db_session
from app.services.auth_service import get_current_admin_user
from app.models.user_models import User
from app.models.item_models import Location
from app.schemas.user_schemas import UserPublic
from app.schemas.admin_schemas import LocationCreate, LocationResponse, LocationUpdate, UserRoleUpdate

router = APIRouter(tags=["Admin"])

# --- Users ---

@router.get("/users", response_model=List[UserPublic])
async def list_users(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db_session),
    current_admin: User = Depends(get_current_admin_user)
):
    result = await db.execute(select(User).offset(skip).limit(limit))
    return result.scalars().all()

@router.put("/users/{user_id}/role", response_model=UserPublic)
async def update_user_role(
    user_id: int,
    role_data: UserRoleUpdate,
    db: AsyncSession = Depends(get_db_session),
    current_admin: User = Depends(get_current_admin_user)
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    user.user_role = role_data.role
    await db.commit()
    await db.refresh(user)
    return user

# --- Locations ---

@router.get("/locations", response_model=List[LocationResponse])
async def list_locations(
    db: AsyncSession = Depends(get_db_session),
    current_admin: User = Depends(get_current_admin_user)
):
    result = await db.execute(select(Location))
    return result.scalars().all()

@router.post("/locations", response_model=LocationResponse)
async def create_location(
    location: LocationCreate,
    db: AsyncSession = Depends(get_db_session),
    current_admin: User = Depends(get_current_admin_user)
):
    new_location = Location(**location.model_dump())
    db.add(new_location)
    try:
        await db.commit()
        await db.refresh(new_location)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Erro ao criar local. Verifique se o nome já existe.")
    return new_location

@router.put("/locations/{location_id}", response_model=LocationResponse)
async def update_location(
    location_id: int,
    location_data: LocationUpdate,
    db: AsyncSession = Depends(get_db_session),
    current_admin: User = Depends(get_current_admin_user)
):
    result = await db.execute(select(Location).where(Location.id == location_id))
    location = result.scalars().first()
    if not location:
        raise HTTPException(status_code=404, detail="Local não encontrado")
    
    location.name = location_data.name
    if location_data.description is not None:
        location.description = location_data.description
        
    await db.commit()
    await db.refresh(location)
    return location

@router.delete("/locations/{location_id}")
async def delete_location(
    location_id: int,
    db: AsyncSession = Depends(get_db_session),
    current_admin: User = Depends(get_current_admin_user)
):
    result = await db.execute(select(Location).where(Location.id == location_id))
    location = result.scalars().first()
    if not location:
        raise HTTPException(status_code=404, detail="Local não encontrado")
    
    await db.delete(location)
    await db.commit()
    return {"message": "Local removido com sucesso"}
