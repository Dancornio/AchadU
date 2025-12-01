from pydantic import BaseModel, EmailStr, field_validator

from app.core.config import settings


class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    full_name: str
    password: str

    @field_validator("email")
    def validate_IsUndf_email(cls, v):

        allowed = False
        for domain in settings.ALLOW_EMAIL_DOMAINS:
            if v.endswith(f"@{domain}"):
                allowed = True
                break
        
        if not allowed:
            domains_str = ", ".join(settings.ALLOW_EMAIL_DOMAINS)
            raise ValueError(f"Apenas e-mails institucionais vinculados a UnDF são permitidos ({domain_srt})")
        return v

class UserPublic(UserBase):
    id: int
    full_name: str
    user_role: str

class UserLogin(UserBase):
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserPublic