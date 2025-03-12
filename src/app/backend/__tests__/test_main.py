from unittest.mock import patch
from fastapi.testclient import TestClient
from src.app.backend.services.main import app

# Create a TestClient instance for the FastAPI app
client = TestClient(app)

# Mock data for testing
mock_post_data = {
    "avatar_url": "https://example.com/avatar.jpg",
    "username": "test_user",
    "title": "Test Post",
    "snippet": "This is a snippet of the test post content.",
    "likes_count": 10,
    "dislikes_count": 2,
    "user_liked": True,
    "user_disliked": False,
}

def test_get_post_success(mocker):
    # Mock Couchbase query result
    mock_query = mocker.patch("src.app.backend.services.main.cluster.query")
    mock_query.return_value = iter([{
        "avatar_url": mock_post_data["avatar_url"],
        "username": mock_post_data["username"],
        "title": mock_post_data["title"],
        "snippet": mock_post_data["snippet"],
        "likes": ["user1", "test_user"],
        "dislikes": ["user2"],
        "user_liked": True,
        "user_disliked": False,
    }])

    # Call the API endpoint
    response = client.get("/post/123", params={"current_user": "test_user"})
    assert response.status_code == 200
    assert response.json() == mock_post_data

def test_get_post_not_found(mocker):
    # Mock Couchbase query to return no results
    mock_query = mocker.patch("src.app.backend.services.main.cluster.query")
    mock_query.return_value = iter([])

    # Call the API endpoint
    response = client.get("/post/123", params={"current_user": "test_user"})
    assert response.status_code == 404
    assert response.json() == {"detail": "Post not found"}

def test_get_post_query_error(mocker):
    # Mock Couchbase query to raise an exception
    mock_query = mocker.patch("src.app.backend.services.main.cluster.query")
    mock_query.side_effect = Exception("Database error")

    # Call the API endpoint
    response = client.get("/post/123", params={"current_user": "test_user"})
    assert response.status_code == 500
    assert response.json() == {"detail": "Database error"}
