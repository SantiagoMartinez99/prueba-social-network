import { useEffect } from "react";
import useAuthStore from "../store/storeAuth";
import store from "../store/storePosts";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const { usePostStore } = store;

function Profile() {
  const { user } = useAuthStore();
  const { posts, setPosts } = usePostStore();

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user) {
        try {
          const postsQuery = query(
            collection(db, "posts"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(postsQuery);
          const userPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(userPosts);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      }
    };

    fetchUserPosts();
  }, [user, setPosts]);

  return (
    <div className="my-60 px-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <img
              src={user.photoURL || "/placeholder.svg?height=128&width=128"}
              alt={user.displayName}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 sm:mb-0 sm:mr-6"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {user.displayName}
              </h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2 flex justify-center sm:justify-start space-x-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {posts.length}
                  </span>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">304</span>
                  <p className="text-sm text-gray-500">Likes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={post.imageURL || "/placeholder.svg?height=300&width=300"}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
