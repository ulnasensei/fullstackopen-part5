import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(()=>{
    const userJson = window.localStorage.getItem("blogUser");

    if(userJson){
      setUser(JSON.parse(userJson));
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("blogUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMsg("Wrong credentials");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("blogUser");

  }

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
      <form>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" required />
        <br />
        <label htmlFor="author">Author: </label>
        <input type="text" id="author" required />
        <br />
        <label htmlFor="url">URL: </label>
        <input type="text" id="url" required />
        <br />
        <label htmlFor="likes">Likes: </label>
        <input type="number" id="likes" min={0} />
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
          <p>{user.name} logged in &nbsp;&nbsp; <button onClick={handleLogout}>Logout</button></p>
          {blogForm()}
        </div>
      ) : (
        loginForm()
      )}
      <br/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
