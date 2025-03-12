# #!/bin/bash

# # Couchbase Server details
# CB_HOST="$1"  # Should be the service name in Docker, e.g., "leap-db"
# CB_PORT="$2"
# CB_USERNAME="$3"
# CB_PASSWORD="$4"
# CLUSTER_NAME="$5"
# BUCKET_NAME="$6"
# BUCKET_RAMSIZE="$7"

# # Couchbase CLI and cbq tool paths
# COUCHBASE_CLI="couchbase-cli"
# CBQ="cbq"

# # Function to check if the cluster is initialized
# is_cluster_initialized() {
#     response=$(curl -s -u "$CB_USERNAME:$CB_PASSWORD" http://"$CB_HOST:$CB_PORT/pools")
#     if echo "$response" | grep -q '"status":"healthy"'; then
#         return 0  # Cluster is initialized
#     else
#         return 1  # Cluster is not initialized
#     fi
# }

# # Function to initialize the cluster
# initialize_cluster() {
#     echo "Initializing Couchbase cluster..."
#     $COUCHBASE_CLI cluster-init -c "$CB_HOST:$CB_PORT" \
#         --cluster-username "$CB_USERNAME" \
#         --cluster-password "$CB_PASSWORD" \
#         --cluster-name "$CLUSTER_NAME" \
#         --cluster-ramsize 1024 \
#         --services data,index,query,fts,eventing,analytics \
#         --index-storage-setting default
# }

# # Function to create a bucket
# create_bucket() {
#     echo "Creating Couchbase bucket..."
#     $COUCHBASE_CLI bucket-create -c "$CB_HOST:$CB_PORT" \
#         --username "$CB_USERNAME" \
#         --password "$CB_PASSWORD" \
#         --bucket "$BUCKET_NAME" \
#         --bucket-type couchbase \
#         --bucket-ramsize "$BUCKET_RAMSIZE" \
#         --bucket-replica 1 \
#         --enable-flush 1 \
#         --wait

#     # Check if the bucket was created successfully
#     if [ $? -ne 0 ]; then
#         echo "Failed to create bucket: $BUCKET_NAME"
#         exit 1
#     fi
#     echo "Bucket $BUCKET_NAME created successfully."
# }

# # Function to create a primary index using the REST API
# create_primary_index() {
#     echo "Creating primary index on bucket: $BUCKET_NAME"
#     curl -u "$CB_USERNAME:$CB_PASSWORD" \
#         -X POST "http://$CB_HOST:$CB_PORT/query/service" \
#         -d "statement=CREATE PRIMARY INDEX ON \`$BUCKET_NAME\`;"
    
#     if [ $? -ne 0 ]; then
#         echo "Failed to create primary index on bucket: $BUCKET_NAME"
#         exit 1
#     fi
#     echo "Primary index created successfully on bucket: $BUCKET_NAME"
# }

# # Function to check if the bucket exists
# is_bucket_exists() {
#     response=$($COUCHBASE_CLI bucket-list -c "$CB_HOST:$CB_PORT" -u "$CB_USERNAME" -p "$CB_PASSWORD")
#     if echo "$response" | grep -q "$BUCKET_NAME"; then
#         return 0  # Bucket exists
#     else
#         return 1  # Bucket does not exist
#     fi
# }

# # Initialize cluster if not already done
# if ! is_cluster_initialized; then
#     initialize_cluster
# else
#     echo "Cluster already initialized."
# fi

# # Create bucket if it doesn't exist
# if ! is_bucket_exists; then
#     create_bucket
#     create_primary_index
# else
#     echo "Bucket '$BUCKET_NAME' already exists."
# fi

# echo "Script completed."

import os
import couchbase.cluster
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions, QueryOptions
from couchbase.collection import Collection

class CouchbaseService:
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
    def __init__(self, db: CouchbaseService):
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
    def __init__(self, db: CouchbaseService):
        self.db = db
        self.collection_name = "posts"

    def create_post(self, post_data: dict):
        post_data["type"] = "Post"
        self.db.insert_document(self.collection_name, str(post_data["postID"]), post_data)

    def get_post(self, post_id: int):
        return self.db.get_document(self.collection_name, str(post_id))

class SoapboxAPIService:
    def __init__(self, couchbase_service: CouchbaseService = None):
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