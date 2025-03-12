import os  # For environment variable access using os.getenv
from couchbase.cluster import Cluster  # To initialize the Couchbase cluster connection
from couchbase.auth import PasswordAuthenticator  # For Couchbase authentication
from couchbase.options import ClusterOptions  # For configuring Couchbase cluster options
from couchbase.collection import Collection  # To define the Collection type

class CouchbaseServices:
    def __init__(self):
        self.cluster = Cluster(os.getenv("COUCHBASE_CONNECTION_STRING"), 
                               ClusterOptions(PasswordAuthenticator(os.getenv("COUCHBASE_USERNAME"), os.getenv("COUCHBASE_PASSWORD"))))
        self.bucket = self.cluster.bucket(os.getenv("COUCHBASE_BUCKET_NAME"))
        self.scope = self.bucket.scope(os.getenv("COUCHBASE_SCOPE_NAME"))

    def get_collection(self, collection_name: str) -> Collection:
        return self.scope.collection(collection_name)

    def insert_document(self, collection_name: str, doc_id: str, data: dict):
        collection = self.get_collection(collection_name)
        collection.insert(doc_id, data)

    def get_document(self, collection_name: str, doc_id: str):
        collection = self.get_collection(collection_name)
        return collection.get(doc_id).content_as[dict]

class UserService:
    def __init__(self, db: CouchbaseServices):
        self.db = db
        self.collection_name = "users"

    def create_user(self, user_data: dict):
        if not user_data.get("metaMaskAddress") and (not user_data.get("email") or not user_data.get("password")):
            raise ValueError("User must have either a MetaMask wallet address OR an email and password.")
        
        if user_data.get("metaMaskAddress") and (user_data.get("email") or user_data.get("password")):
            raise ValueError("User cannot have both a MetaMask wallet address and an email/password.")
        
        user_data["type"] = "User"
        self.db.insert_document(self.collection_name, str(user_data["userID"]), user_data)

    def get_user(self, user_id: int):
        return self.db.get_document(self.collection_name, str(user_id))

class PostService:
    def __init__(self, db: CouchbaseServices):
        self.db = db
        self.collection_name = "posts"

    def create_post(self, post_data: dict):
        post_data["type"] = "Post"
        self.db.insert_document(self.collection_name, str(post_data["postID"]), post_data)

    def get_post(self, post_id: int):
        return self.db.get_document(self.collection_name, str(post_id))

class SoapboxAPIService:
    def __init__(self, couchbase_service: CouchbaseServices = None):
        self.db = couchbase_service if couchbase_service else CouchbaseService()
        self.user = UserService(self.db)
        self.post = PostService(self.db)

    def setup(self):
        try:
            scope_name = os.getenv("COUCHBASE_SCOPE_NAME")
            if not scope_name:
                raise ValueError("COUCHBASE_SCOPE_NAME is not defined in the environment variables")
            
            collections = ["users", "posts"]
            bucket_name = os.getenv("COUCHBASE_BUCKET_NAME")

            for collection_name in collections:
                try:
                    self.db.get_collection(collection_name)
                    print(f"Collection '{collection_name}' is ready.")
                except Exception as e:
                    print(f"Error setting up collection '{collection_name}':", e)
                    raise e
        except Exception as e:
            print("Error during setup:", e)
            raise e

