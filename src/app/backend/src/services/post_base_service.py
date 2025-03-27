from typing import Optional
from datetime import datetime
from base_service import BaseService, CouchbaseService
from base_service import BaseEntity

class Post(BaseEntity):
    def __init__(self, title: str, content: str, author_id: str):
        self.id: Optional[str] = None
        self.title = title
        self.content = content
        self.author_id = author_id
        self.createdAt: Optional[datetime] = None
        self.updatedAt: Optional[datetime] = None

class PostBaseService(BaseService[Post]):
    def generate_id(self, entity: Post) -> str:
        # Example: generate a unique ID using title and timestamp
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        return f"post::{entity.title.replace(' ', '_').lower()}::{timestamp}"
