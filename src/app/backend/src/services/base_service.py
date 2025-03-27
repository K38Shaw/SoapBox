from abc import ABC, abstractmethod
from datetime import datetime
from typing import Any, Callable, Dict, Generic, List, Optional, TypeVar

T = TypeVar("T", bound="BaseEntity")

class BaseEntity:
    id: Optional[str]
    createdAt: Optional[datetime]
    updatedAt: Optional[datetime]

class BaseServiceOptions:
    def __init__(self, on_create_callback: Optional[Callable] = None):
        self.on_create_callback = on_create_callback

class CouchbaseService:
    # Stub methods for Couchbase service interaction
    async def upsert_document(self, document: Dict[str, Any], entity_type: str):
        pass

    async def delete_document(self, document_id: str, entity_type: str):
        pass

    async def request_document(self, document_id: str, entity_type: str) -> Optional[Dict[str, Any]]:
        return None

    async def run_query(self, query: str) -> Optional[Dict[str, Any]]:
        return None

class BaseService(ABC, Generic[T]):
    def __init__(
        self, 
        entity_type: str, 
        couchbase_service: CouchbaseService, 
        options: Optional[BaseServiceOptions] = None
    ):
        self.db = couchbase_service
        self.entity_type = entity_type
        self.service_options = options or BaseServiceOptions()

    async def create(self, entity: T) -> T:
        entity.id = self.generate_id(entity)
        entity = await self.pre_process_create(entity)
        entity.createdAt = datetime.utcnow()

        await self.db.upsert_document(entity.__dict__, self.entity_type)
        created_entity = await self.get(entity.id)

        return await self.post_process_create(created_entity)

    async def update(self, entity_id: str, updates: Dict[str, Any]) -> Optional[T]:
        existing_entity = await self.get(entity_id)
        if not existing_entity:
            return None

        updated_entity = await self.pre_process_update({
            **existing_entity.__dict__,
            **updates,
            "updatedAt": datetime.utcnow()
        })

        if not updated_entity.get("id"):
            raise ValueError("Cannot update a document with no id")

        await self.db.upsert_document(updated_entity, self.entity_type)
        result = await self.get(entity_id)

        return await self.post_process_update(result) if result else None

    async def delete(self, entity_id: str) -> bool:
        entity = await self.get(entity_id)
        if not entity:
            return False

        await self.pre_process_delete(entity)
        await self.db.delete_document(entity_id, self.entity_type)

        return await self.post_process_delete(entity_id)

    async def get(self, entity_id: str) -> Optional[T]:
        try:
            query_info = await self.db.request_document(entity_id, self.entity_type)
            entity = query_info.get("content") if query_info else None

            return await self.post_process_get(entity)
        except Exception as error:
            print(f"{self.entity_type} not found: {error}")
            return None

    async def get_all(self, where_clause: str = "", select_clause: str = "*") -> List[T]:
        scope_name = "default_scope"
        bucket_name = "default_bucket"

        query = f"SELECT {select_clause} FROM `{bucket_name}`.`{scope_name}`.{self.entity_type}"
        if where_clause:
            query += f" WHERE {where_clause}"

        query_info = await self.db.run_query(query)
        entities = query_info.get("rows", []) if query_info else []

        return await self.post_process_get_all(entities)

    @abstractmethod
    def generate_id(self, entity: T) -> str:
        pass

    async def pre_process_create(self, entity: T) -> T:
        return entity

    async def pre_process_update(self, entity: Dict[str, Any]) -> Dict[str, Any]:
        return entity

    async def pre_process_delete(self, entity: T):
        pass

    async def post_process_create(self, entity: T) -> T:
        if self.service_options.on_create_callback:
            await self.service_options.on_create_callback(entity)
        return entity

    async def post_process_update(self, entity: T) -> T:
        return entity

    async def post_process_delete(self, entity_id: str) -> bool:
        return True

    async def post_process_get(self, entity: Optional[T]) -> Optional[T]:
        return entity

    async def post_process_get_all(self, entities: List[T]) -> List[T]:
        return entities
