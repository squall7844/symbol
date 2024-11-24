// import { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("/api/auth/login", {
//         email,
//         password,
//       });
//       console.log(response.data);
//     } catch (error) {
//       setError("ログインに失敗しました。");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Login</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default Login;
