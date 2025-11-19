from datetime import date, datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class ItemStatus(str, Enum):
    lost = "lost"
    found = "found"
    claimed = "claimed"
    archived = "archived"

class Itembase(BaseModel):
    name: str
    description: str
    status: ItemStatus = ItemStatus.found
    event_date: date
    category_id: int
    location_id: int

    reported_by_id: int

class ItemCreate(Itembase):
    item_image_url: Optional[str] = None

class ItemResponse(Itembase):
    id: int
    reported_at: datetime
    item_image_url: Optional[str] = None

class Config:
    from_attributes = True