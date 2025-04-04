from typing import Optional, Tuple, Dict, Any, List
from datetime import datetime
import hashlib
import os
import jwt
from base_service import BaseService, CouchbaseService, BaseEntity, BaseServiceOptions

class User(BaseEntity):
    def __init__(self, username: str, email: str, password: Optional[str] = None):
        self.id: Optional[str] = None
        self.username = username
        self.email = email
        self.password_hash: Optional[str] = None
        self.salt: Optional[str] = None
        self.last_login: Optional[datetime] = None
        self.createdAt: Optional[datetime] = None
        self.updatedAt: Optional[datetime] = None
        
        if password:
            self.set_password(password)
    
    def set_password(self, password: str) -> None:
        """Hash password with a random salt and store both hash and salt."""
        salt = os.urandom(32)
        self.salt = salt.hex()
        password_hash = hashlib.pbkdf2_hmac(
            'sha256', 
            password.encode('utf-8'), 
            salt, 
            100000
        )
        self.password_hash = password_hash.hex()
    
    def verify_password(self, password: str) -> bool:
        """Verify a password against the stored hash and salt."""
        if not self.password_hash or not self.salt:
            return False
            
        salt = bytes.fromhex(self.salt)
        password_hash = hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),
            salt,
            100000
        ).hex()
        
        return password_hash == self.password_hash


class UserService(BaseService[User]):
    def __init__(
        self, 
        couchbase_service: CouchbaseService,
        options: Optional[BaseServiceOptions] = None,
        jwt_secret: str = None,
        jwt_expiry: int = 3600
    ):
        super().__init__("users", couchbase_service, options)
        self.JWT_SECRET = jwt_secret or os.environ.get('JWT_SECRET', 'your-secret-key')
        self.JWT_EXPIRY = jwt_expiry or int(os.environ.get('JWT_EXPIRY', '3600'))  # 1 hour default
    
    def generate_id(self, entity: User) -> str:
        """Generate a unique ID for the user based on username."""
        return f"user::{entity.username.lower()}"
    
    async def register_user(self, username: str, email: str, password: str) -> Tuple[bool, str, Optional[User]]:
        """Register a new user."""
        # Check if user exists by username
        existing_user = await self.find_by_username(username)
        if existing_user:
            return False, "Username already exists", None
            
        # Check if user exists by email
        existing_email = await self.find_by_email(email)
        if existing_email:
            return False, "Email already registered", None
        
        # Create new user
        user = User(username, email, password)
        
        # User will be saved with createdAt timestamp in the create method
        created_user = await self.create(user)
        if not created_user:
            return False, "Failed to create user", None
            
        return True, "User registered successfully", created_user
    
    async def login(self, username: str, password: str) -> Tuple[bool, str, Optional[str]]:
        """Login a user and return JWT token on success."""
        user = await self.find_by_username(username)
        
        if not user:
            return False, "Invalid username or password", None
            
        if not user.verify_password(password):
            return False, "Invalid username or password", None
        
        # Update last login time
        updates = {
            "last_login": datetime.utcnow()
        }
        await self.update(user.id, updates)
        
        # Generate JWT token
        token = self.generate_token(user)
        
        return True, "Login successful", token
    
    def generate_token(self, user: User) -> str:
        """Generate JWT token for authenticated user."""
        payload = {
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'exp': datetime.utcnow().timestamp() + self.JWT_EXPIRY
        }
        
        token = jwt.encode(payload, self.JWT_SECRET, algorithm='HS256')
        return token
    
    async def verify_token(self, token: str) -> Tuple[bool, str, Optional[User]]:
        """Verify JWT token and return user if valid."""
        try:
            payload = jwt.decode(token, self.JWT_SECRET, algorithms=['HS256'])
            user_id = payload.get('user_id')
            
            if not user_id:
                return False, "Invalid token", None
                
            user = await self.get(user_id)
            if not user:
                return False, "User not found", None
                
            return True, "Token verified", user
            
        except jwt.ExpiredSignatureError:
            return False, "Token expired", None
        except jwt.InvalidTokenError:
            return False, "Invalid token", None
    
    async def find_by_username(self, username: str) -> Optional[User]:
        """Find user by username."""
        user_id = f"user::{username.lower()}"
        return await self.get(user_id)
    
    async def find_by_email(self, email: str) -> Optional[User]:
        """Find user by email."""
        where_clause = f"email = '{email}'"
        users = await self.get_all(where_clause)
        
        if not users or len(users) == 0:
            return None
            
        return users[0]
    
    async def pre_process_create(self, entity: User) -> User:
        """Validate entity before creation."""
        if not entity.username or not entity.email:
            raise ValueError("Username and email are required")
        return entity
    
    async def post_process_get(self, entity: Optional[Dict[str, Any]]) -> Optional[User]:
        """Convert dictionary to User object."""
        if not entity:
            return None
            
        user = User(entity.get('username', ''), entity.get('email', ''))
        user.id = entity.get('id')
        user.password_hash = entity.get('password_hash')
        user.salt = entity.get('salt')
        user.last_login = entity.get('last_login')
        user.createdAt = entity.get('createdAt')
        user.updatedAt = entity.get('updatedAt')
        
        return user
    
    async def post_process_get_all(self, entities: List[Dict[str, Any]]) -> List[User]:
        """Convert list of dictionaries to list of User objects."""
        users = []
        for entity in entities:
            user = await self.post_process_get(entity)
            if user:
                users.append(user)
                
        return users


