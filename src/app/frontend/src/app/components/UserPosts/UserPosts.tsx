import styles from './UserPosts.module.css';
import PostCard from '../PostCard/PostCard';

interface Post {
  id: number;
  topic: string;
  body: string;
  imageUrl: string;
  videoUrl?: string;
}

const dummyPosts: Post[] = [
  {
    id: 1, topic: "Tech:", body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', imageUrl: "/Bannana.jpeg",
   
  } ,
  {
    id: 2, topic: "AI:",body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', imageUrl: "/Bannana.jpeg",
    
  },
];

const UserPosts = () => {
  return (
    <div className={styles.postsContainer}>
      {dummyPosts.map(post => (
        <PostCard key={post.id} topic={post.topic} body={post.body} imageUrl={post.imageUrl}  />
      ))}
    </div>
  );
};

export default UserPosts;
