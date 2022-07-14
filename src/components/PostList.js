import React from "react";
import { Post } from "./Post";

export const PostList = ({ allPosts }) => {
    return (
        <div className="post-list">
            {allPosts?.map((post) => (
                <Post key={post?.id} post={post} />
            ))}
        </div>
    );
};
