from sqlalchemy import Column, ForeignKey, Integer, String, Text
from app.core.db import Base


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(Text)


class Location(Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text)


class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=False)

    # chaves estrangeiras

    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    location_id = Column(Integer, ForeignKey('locations.id'), nullable=False)
    reported_by_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    
    
    
    #Usuario que encontrou/reinvidicou o item
    handler_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    reported_at = Column(Timestamp(), not_null=True)
    event_data = Column(Date)
