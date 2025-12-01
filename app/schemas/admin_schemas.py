from pydantic import BaseModel
from typing import Optional
from app.models.user_models import UserRoleEnum

class LocationBase(BaseModel):
    name: str
    description: Optional[str] = None

class LocationCreate(LocationBase):
    pass

class LocationUpdate(LocationBase):
    pass

class LocationResponse(LocationBase):
    id: int
    class Config:
        from_attributes = True

class UserRoleUpdate(BaseModel):
    role: UserRoleEnum
