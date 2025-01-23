#!/bin/bash

# Couchbase Server details
CB_HOST="$1"  # Should be the service name in Docker, e.g., "leap-db"
CB_PORT="$2"
CB_USERNAME="$3"
CB_PASSWORD="$4"
CLUSTER_NAME="$5"
BUCKET_NAME="$6"
BUCKET_RAMSIZE="$7"

# Couchbase CLI and cbq tool paths
COUCHBASE_CLI="couchbase-cli"
CBQ="cbq"

# Function to check if the cluster is initialized
is_cluster_initialized() {
    response=$(curl -s -u "$CB_USERNAME:$CB_PASSWORD" http://"$CB_HOST:$CB_PORT/pools")
    if echo "$response" | grep -q '"status":"healthy"'; then
        return 0  # Cluster is initialized
    else
        return 1  # Cluster is not initialized
    fi
}

# Function to initialize the cluster
initialize_cluster() {
    echo "Initializing Couchbase cluster..."
    $COUCHBASE_CLI cluster-init -c "$CB_HOST:$CB_PORT" \
        --cluster-username "$CB_USERNAME" \
        --cluster-password "$CB_PASSWORD" \
        --cluster-name "$CLUSTER_NAME" \
        --cluster-ramsize 1024 \
        --services data,index,query,fts,eventing,analytics \
        --index-storage-setting default
}

# Function to create a bucket
create_bucket() {
    echo "Creating Couchbase bucket..."
    $COUCHBASE_CLI bucket-create -c "$CB_HOST:$CB_PORT" \
        --username "$CB_USERNAME" \
        --password "$CB_PASSWORD" \
        --bucket "$BUCKET_NAME" \
        --bucket-type couchbase \
        --bucket-ramsize "$BUCKET_RAMSIZE" \
        --bucket-replica 1 \
        --enable-flush 1 \
        --wait

    # Check if the bucket was created successfully
    if [ $? -ne 0 ]; then
        echo "Failed to create bucket: $BUCKET_NAME"
        exit 1
    fi
    echo "Bucket $BUCKET_NAME created successfully."
}

# Function to create a primary index using the REST API
create_primary_index() {
    echo "Creating primary index on bucket: $BUCKET_NAME"
    curl -u "$CB_USERNAME:$CB_PASSWORD" \
        -X POST "http://$CB_HOST:$CB_PORT/query/service" \
        -d "statement=CREATE PRIMARY INDEX ON \`$BUCKET_NAME\`;"
    
    if [ $? -ne 0 ]; then
        echo "Failed to create primary index on bucket: $BUCKET_NAME"
        exit 1
    fi
    echo "Primary index created successfully on bucket: $BUCKET_NAME"
}

# Function to check if the bucket exists
is_bucket_exists() {
    response=$($COUCHBASE_CLI bucket-list -c "$CB_HOST:$CB_PORT" -u "$CB_USERNAME" -p "$CB_PASSWORD")
    if echo "$response" | grep -q "$BUCKET_NAME"; then
        return 0  # Bucket exists
    else
        return 1  # Bucket does not exist
    fi
}

# Initialize cluster if not already done
if ! is_cluster_initialized; then
    initialize_cluster
else
    echo "Cluster already initialized."
fi

# Create bucket if it doesn't exist
if ! is_bucket_exists; then
    create_bucket
    create_primary_index
else
    echo "Bucket '$BUCKET_NAME' already exists."
fi

echo "Script completed."
