import axios from "axios";

const LoginService = data =>
  axios.post("http://localhost:5000/user/login", data).then(res => res.status)
.catch(err => {
  console.log(err);
});

export default LoginService;
