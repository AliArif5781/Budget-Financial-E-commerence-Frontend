// import { LoginForm } from "@/components/LoginForm";
import LoginForm from "@/components/LoginForm";
import authImg from "/authImg.png";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center gap-5 px-5 transition-colors">
      {/* Login Card */}

      <div className="w-full h-full max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
