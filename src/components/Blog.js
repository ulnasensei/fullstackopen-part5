import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [displayDetails, setDisplayDetails] = useState(false);

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "0.1rem",
        padding: "0.3rem",
      }}
    >
      {blog.title} by {blog.author}{" "}
      <button onClick={() => setDisplayDetails((current) => !current)}>
        {displayDetails ? "Hide" : "View"}
      </button>
      {displayDetails && (
        <>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}{" "}
          <button
            onClick={() => updateBlog(blog.id, { likes: blog.likes + 1 })}
          >
            Like
          </button>
          <br />
          Posted by: {blog.user.name}
          <br />
        </>
      )}
    </div>
  );
};

export default Blog;
