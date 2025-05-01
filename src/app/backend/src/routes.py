from flask import request, jsonify, Blueprint
from services.couchbaseServices import CouchbaseServices
from services.user_base_service import UserService
from .services.post_base_service import PostBaseService, Post
from functools import wraps
from typing import Optional

# Create blueprints for API organization
api = Blueprint('api', __name__)
user_api = Blueprint('user_api', __name__, url_prefix='/api/users')
post_api = Blueprint('post_api', __name__, url_prefix='/api/posts')

# Initialize services
couchbase_service = CouchbaseServices()
user_service = UserService(couchbase_service)
post_service = PostBaseService("posts", couchbase_service)

# Authentication decorator
def token_required(f):
    @wraps(f)
    async def decorated(*args, **kwargs):
        token = None
        
        # Check if token is in headers
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'success': False, 'message': 'Token is missing'}), 401
            
        # Verify token
        success, message, user = await user_service.verify_token(token)
        if not success:
            return jsonify({'success': False, 'message': message}), 401
            
        # Add user to request context
        request.user = user
        return await f(*args, **kwargs)
    
    return decorated

# User Routes
@user_api.route('/register', methods=['POST'])
async def register():
    data = request.json
    
    # Validate required fields
    if not data or not all(k in data for k in ['username', 'email', 'password']):
        return jsonify({
            'success': False,
            'message': 'Username, email, and password are required'
        }), 400
    
    # Register user
    success, message, user = await user_service.register_user(
        data['username'],
        data['email'],
        data['password']
    )
    
    if not success:
        return jsonify({'success': False, 'message': message}), 400
        
    # Don't return password hash and salt in response
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'createdAt': user.createdAt.isoformat() if user.createdAt else None
    }
    
    return jsonify({
        'success': True,
        'message': message,
        'user': user_data
    }), 201

@user_api.route('/login', methods=['POST'])
async def login():
    data = request.json
    
    # Validate required fields
    if not data or not all(k in data for k in ['username', 'password']):
        return jsonify({
            'success': False,
            'message': 'Username and password are required'
        }), 400
    
    # Login user
    success, message, token = await user_service.login(
        data['username'],
        data['password']
    )
    
    if not success:
        return jsonify({'success': False, 'message': message}), 401
        
    return jsonify({
        'success': True,
        'message': message,
        'token': token
    }), 200

@user_api.route('/me', methods=['GET'])
@token_required
async def get_current_user():
    user = request.user
    
    # Don't return password hash and salt in response
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'last_login': user.last_login.isoformat() if user.last_login else None,
        'createdAt': user.createdAt.isoformat() if user.createdAt else None
    }
    
    return jsonify({
        'success': True,
        'user': user_data
    }), 200

@user_api.route('/<user_id>', methods=['GET'])
@token_required
async def get_user(user_id):
    user = await user_service.get(user_id)
    
    if not user:
        return jsonify({
            'success': False,
            'message': 'User not found'
        }), 404
    
    # Don't return password hash and salt in response
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'createdAt': user.createdAt.isoformat() if user.createdAt else None
    }
    
    return jsonify({
        'success': True,
        'user': user_data
    }), 200

# Post Routes
@post_api.route('/', methods=['POST'])
@token_required
async def create_post():
    user = request.user
    data = request.json
    
    # Validate required fields
    if not data or not all(k in data for k in ['title', 'content']):
        return jsonify({
            'success': False,
            'message': 'Title and content are required'
        }), 400
    
    # Create post
    post = Post(data['title'], data['content'], user.id)
    created_post = await post_service.create(post)
    
    if not created_post:
        return jsonify({
            'success': False,
            'message': 'Failed to create post'
        }), 500
    
    post_data = {
        'id': created_post.id,
        'title': created_post.title,
        'content': created_post.content,
        'author_id': created_post.author_id,
        'createdAt': created_post.createdAt.isoformat() if created_post.createdAt else None
    }
    
    return jsonify({
        'success': True,
        'message': 'Post created successfully',
        'post': post_data
    }), 201

@post_api.route('/', methods=['GET'])
async def get_all_posts():
    posts = await post_service.get_all()
    
    # Format posts for response
    posts_data = []
    for post in posts:
        posts_data.append({
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'author_id': post.author_id,
            'createdAt': post.createdAt.isoformat() if post.createdAt else None,
            'updatedAt': post.updatedAt.isoformat() if post.updatedAt else None
        })
    
    return jsonify({
        'success': True,
        'posts': posts_data
    }), 200

@post_api.route('/<post_id>', methods=['GET'])
async def get_post(post_id):
    post = await post_service.get(post_id)
    
    if not post:
        return jsonify({
            'success': False,
            'message': 'Post not found'
        }), 404
    
    post_data = {
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'author_id': post.author_id,
        'createdAt': post.createdAt.isoformat() if post.createdAt else None,
        'updatedAt': post.updatedAt.isoformat() if post.updatedAt else None
    }
    
    return jsonify({
        'success': True,
        'post': post_data
    }), 200

@post_api.route('/<post_id>', methods=['PUT'])
@token_required
async def update_post(post_id):
    user = request.user
    data = request.json
    
    # Get the post
    post = await post_service.get(post_id)
    
    if not post:
        return jsonify({
            'success': False,
            'message': 'Post not found'
        }), 404
    
    # Check if user is the author
    if post.author_id != user.id:
        return jsonify({
            'success': False,
            'message': 'You are not authorized to update this post'
        }), 403
    
    # Update only provided fields
    updates = {}
    if 'title' in data:
        updates['title'] = data['title']
    if 'content' in data:
        updates['content'] = data['content']
    
    if not updates:
        return jsonify({
            'success': False,
            'message': 'No updates provided'
        }), 400
    
    # Update post
    updated = await post_service.update(post_id, updates)
    
    if not updated:
        return jsonify({
            'success': False,
            'message': 'Failed to update post'
        }), 500
    
    # Get updated post
    updated_post = await post_service.get(post_id)
    
    post_data = {
        'id': updated_post.id,
        'title': updated_post.title,
        'content': updated_post.content,
        'author_id': updated_post.author_id,
        'createdAt': updated_post.createdAt.isoformat() if updated_post.createdAt else None,
        'updatedAt': updated_post.updatedAt.isoformat() if updated_post.updatedAt else None
    }
    
    return jsonify({
        'success': True,
        'message': 'Post updated successfully',
        'post': post_data
    }), 200

@post_api.route('/<post_id>', methods=['DELETE'])
@token_required
async def delete_post(post_id):
    user = request.user
    
    # Get the post
    post = await post_service.get(post_id)
    
    if not post:
        return jsonify({
            'success': False,
            'message': 'Post not found'
        }), 404
    
    # Check if user is the author
    if post.author_id != user.id:
        return jsonify({
            'success': False,
            'message': 'You are not authorized to delete this post'
        }), 403
    
    # Delete post
    deleted = await post_service.delete(post_id)
    
    if not deleted:
        return jsonify({
            'success': False,
            'message': 'Failed to delete post'
        }), 500
    
    return jsonify({
        'success': True,
        'message': 'Post deleted successfully'
    }), 200

@post_api.route('/user/<user_id>', methods=['GET'])
async def get_user_posts(user_id):
    # Verify user exists
    user = await user_service.get(user_id)
    
    if not user:
        return jsonify({
            'success': False,
            'message': 'User not found'
        }), 404
    
    # Get posts by author_id
    where_clause = f"author_id = '{user_id}'"
    posts = await post_service.get_all(where_clause)
    
    # Format posts for response
    posts_data = []
    for post in posts:
        posts_data.append({
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'author_id': post.author_id,
            'createdAt': post.createdAt.isoformat() if post.createdAt else None,
            'updatedAt': post.updatedAt.isoformat() if post.updatedAt else None
        })
    
    return jsonify({
        'success': True,
        'posts': posts_data
    }), 200

def init_app(app):
    """Initialize the application with API routes"""
    # Register blueprints
    app.register_blueprint(api)
    app.register_blueprint(user_api)
    app.register_blueprint(post_api)
    
    # Register error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'success': False,
            'message': 'Resource not found'
        }), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({
            'success': False,
            'message': 'Internal server error'
        }), 500
    
    return app