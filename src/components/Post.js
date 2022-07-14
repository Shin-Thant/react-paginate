import React from "react";

export const Post = ({ post }) => {
    return (
        <div className="post">
            <h2>{post.id}</h2>
            {/* post endpoint = title / comment endpoint = email */}
            <p>{post.title}</p>
        </div>
    );
};
