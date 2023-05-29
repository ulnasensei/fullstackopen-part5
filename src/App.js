import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJson = window.localStorage.getItem("blogUser");

    if (userJson) {
      const user = JSON.parse(userJson)
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleStatus = (msg, type) => {
    const timeout = 5000;
    if(type === "success"){
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(null), timeout);
    } else{
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(null), timeout);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      handleStatus("login successful", "success");

      window.localStorage.setItem("blogUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleStatus("Wrong credentials", "error");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    handleStatus("logout successful", "success");
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("blogUser");
  };

  const handleBlogCreate = async (event) => {
    event.preventDefault();

    try {
      const addedBlog = await blogService.create({ title, author, url, likes });
      handleStatus(`a new blog ${addedBlog.title} by ${addedBlog.author} added.`, "success");
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (exception) {
      handleStatus("Failed to add new blog.", "error");
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          required
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <form onSubmit={handleBlogCreate}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          id="author"
          required
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <label htmlFor="url">URL: </label>
        <input
          type="text"
          id="url"
          required
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <label htmlFor="likes">Likes: </label>
        <input
          type="number"
          id="likes"
          min={0}
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
        />
        <br />
        <button type="submit">Post</button>
      </form>
    );
  };

  return (
    <div>
      <h2>Blogs</h2>

      {user ? (
        <div>
          <p>
            {user.name} logged in &nbsp;&nbsp;{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
          {blogForm()}
        </div>
      ) : (
        loginForm()
      )}
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
