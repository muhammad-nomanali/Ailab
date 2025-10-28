
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };


  return (
    <div className="lg:min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 bg-[url('/src/assets/header-img1.jpg')] bg-cover">
      <div className="grid lg:grid-cols-2 items-center gap-10 max-w-6xl max-lg:max-w-lg w-full">
        <div></div>
        <form
          onSubmit={handleLogin}
          className="max-w-md lg:ml-auto w-full bg-white py-10 px-6 rounded-lg"
        >
          <h2 className="text-slate-900 text-3xl font-semibold mb-8">Log in</h2>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">
                User Name
              </label>
              <input
                type="text"
                placeholder="Username"
                className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              Log in
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
