from typing import Optional
from datetime import datetime
from base_service import BaseService, CouchbaseService
from base_service import BaseEntity

class User(BaseEntity):
    def __init__(self, username: str, email: str):
        self.id: Optional[str] = None
        self.username = username
        self.email = email
        self.createdAt: Optional[datetime] = None
        self.updatedAt: Optional[datetime] = None

class UserBaseService(BaseService[User]):
    def generate_id(self, entity: User) -> str:
        
        return f"user::{entity.username.lower()}"
