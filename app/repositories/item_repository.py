from select import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.item_models import Item
from app.schemas.item_schemas import ItemCreate, ItemStatus


class ItemRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, item_data: ItemCreate) -> Item:
        db_item = Item(**item_data.model_dump())
        self.db.add(db_item)
        await self.db.commit()
        await self.db.refresh(db_item)
        return db_item

    async def get_all(self, status: ItemStatus = None, skip: int = 0, limit: int = 100):
        query = select(Item).offset(skip).limit(limit)
        if status:
            query = query.where(Item.status == status)
        result = await self.db.execute(query)
        return result.scalars().all()
    
    async def get_by_id(self, item_id: int) -> Item | None:
        query = select(Item).where(Item.id == item_id)
        result = await self.db.execute(query)
        return result.scalars().first() 