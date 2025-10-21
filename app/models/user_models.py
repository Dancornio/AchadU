from sqlalchemy import Column, ForeignKey, Integer, String, Text
from app.core.db import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), not_null=True)
    email = Column(String(100), unique=True, not_null=True)
    