from sqlalchemy import Column, DateTime, Integer, String, func, Enum as SQLAlchemyEnum
from sqlalchemy.orm import mapped_column, Mapped
from app.core.db import Base
import enum

# i hope i remenber to check the security

class UserRoleEnum(str, enum.Enum):
    student_staff = "student_staff"
    admin = "admin"


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    user_role: Mapped[UserRoleEnum] = mapped_column(SQLAlchemyEnum(UserRoleEnum, name="user_role"), nullable=False, default=UserRoleEnum.student_staff)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now())
    