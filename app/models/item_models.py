from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, Date, func, Enum as SQLAlchemyEnum
from sqlalchemy.orm import Mapped, mapped_column
from app.core.db import Base
import enum

# Como essa API utiliza o SQLAlchemy 2.0.44, vou refatorar ( e terminar ) usando o "mapped"
# Basicaly in new the new version of SQLAlchemy 2.0.44, it is recommended use "mapped", so i'm going refactor all the models ( and finish them )

class ItemStatusEnum(str , enum.Enum):
    lost = "lost"
    found = "found"
    claimed = "claimed"
    archived = "archived"


class Category(Base):
    __tablename__ = "categories"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    decription: Mapped[str] = mapped_column(Text, nullable=True)
    

    # id = Column(Integer, primary_key=True, index=True)
    # name = Column(String(50), unique=True, nullable=False)
    # description = Column(Text)


class Location(Base):
    __tablename__ = "locations"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)


    # id = Column(Integer, primary_key=True, index=True)
    # name = Column(String(100), unique=True, nullable=False)
    # description = Column(Text)


class Item(Base):
    __tablename__ = "items"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[ItemStatusEnum] = mapped_column(SQLAlchemyEnum(ItemStatusEnum))
    event_date: Mapped[Date] = mapped_column(Date, nullable=False)
    reported_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now())
    item_image_url: Mapped[str] = mapped_column(String(255), nullable=True)

    category_id: Mapped[int] = mapped_column(Integer, ForeignKey('categories.id'), nullable=False)
    location_id: Mapped[int] = mapped_column(Integer, ForeignKey('locations.id'), nullable=False)
    reported_by_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable=False)

    handler_id: Mapped[int | None] = mapped_column(Integer, ForeignKey('users.id'), nullable=True)
    
    # id = Column(Integer, primary_key=True, index=True)
    # name = Column(String(100), unique=True, nullable=False)
    # description = Column(Text, nullable=False)

    # chaves estrangeiras

    # category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    # location_id = Column(Integer, ForeignKey('locations.id'), nullable=False)
    # reported_by_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    
    
    
    # #Usuario que encontrou/reinvidicou o item
    # handler_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    # reported_at = Column(Timestamp(), nullable=False)
    # event_data = Column(Date)
