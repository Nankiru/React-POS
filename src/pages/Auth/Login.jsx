import "../../assets/css/login.css";
import EmailIcon from "../../assets/icons/email.png";
import PassIcon from "../../assets/icons/pass.png";
import GitHubIcon from "../../assets/icons/github.png";
import GoogleIcon from "../../assets/icons/google.png";
import LoginLogo from "../../assets/icons/login.png";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Loading from "../../components/Loading";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const demoAuth = (provider) => {
    alert(provider + " auth — maintaining ");
  };
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const email = userEmail;
    const pass = userPassword;
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // Check credentials with backend
    fetch("http://127.0.0.1:8000/api/pos/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: pass }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'successful') {
          localStorage.setItem("auth", "true");
          setSuccess(true);
          navigate("/");
        } else {
          setError(data.message || "Invalid email or password");
        }
      })
      .catch(() => {
        setError("Server error. Please try again later.");
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center backdrop-blur-md overflow-hidden">
      {/* Background Effects */}
      <div
        className="blob one absolute animate-pulse top-0 left-0 w-80 h-80 bg-purple-300 rounded-full opacity-30 blur-2xl animate-blob1"
        aria-hidden="true"
      ></div>
      <div
        className="blob two absolute animate-pulse top-1/2 right-0 w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-2xl animate-blob2"
        aria-hidden="true"
      ></div>
      <div
        className="blob three absolute animate-pulse bottom-0 left-1/2 w-72 h-72 bg-yellow-200 rounded-full opacity-20 blur-2xl animate-blob3"
        aria-hidden="true"
      ></div>
      <div
        className="grain absolute animate-pulse inset-0 pointer-events-none"
        aria-hidden="true"
      ></div>

      <main className="wrap relative z-10 w-full max-w-md mx-auto">
        <form
          className="card"
          id="login-form"
          autoComplete="on"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="inner">
            <div className="text-center flex justify-center items-center mb-1">
              <img src={LoginLogo} alt="logo login" className="w-16 h-16" />
            </div>
            <header
              className="brand flex items-center gap-3 mb-2 justify-center"
              aria-label="App brand"
            >
              {/* <div className="logo w-12 h-12 bg-purple-500 rounded-full"></div> */}
              <div className="text-center w-full">
                <div className="title text-2xl font-bold text-purple-700">
                  Welcome back
                </div>
                <div className="subtitle text-white">Sign in to continue</div>
              </div>
            </header>

            {/* Email */}
            <div className="fld mb-4 ">
              <label className="label block mb-1 font-semibold" htmlFor="email">
                Email
              </label>
              <span className="icon mt-[15px] mr-2 align-middle">
                <img src={EmailIcon} alt="email icon" className="w-5 h-5" />
              </span>
              <input
                className="inp w-full border rounded-lg px-3 py-2"
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setUserEmail(e.target.value)}
                inputMode="email"
                autoComplete="email"
                ref={emailRef}
              />
            </div>

            {/* Password */}
            <div className="fld mb-4 relative">
              <label
                className="label block mb-1 font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <span className="icon mt-[14px] inline-block mr-2 align-middle">
                <img src={PassIcon} alt="email icon" className="w-5 h-5" />
              </span>
              <input
                className="inp w-full border rounded-lg px-3 py-2"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                minLength={6}
                onChange={(e) => setUserPassword(e.target.value)}
                required
                autoComplete="current-password"
                ref={passwordRef}
              />
              <button
                className="toggle absolute right-2 top-[25px] mt-[14px]"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <svg
                    id="eye"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M17.94 17.94 6.06 6.06" />
                    <path d="M10.58 5.08A9.95 9.95 0 0 1 12 5c6 0 10 7 10 7a17.46 17.46 0 0 1-2.23 2.88" />
                    <path d="M2 2l20 20" />
                  </svg>
                ) : (
                  <svg
                    id="eye"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3.2" />
                  </svg>
                )}
              </button>
            </div>

            <div className="row flex items-center justify-between mb-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox" id="remember" />{" "}
                Remember me
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Just maintaining 🙂");
                }}
              >
                Forgot password?
              </a>
            </div>

            <button
              className="btn w-full bg-purple-500 text-white py-2 rounded-lg font-semibold mb-4"
              type="submit"
              disabled={!userEmail || !userPassword}
              style={{
                cursor: !userEmail || !userPassword ? "not-allowed" : "pointer",
                opacity: !userEmail || !userPassword ? 0.6 : 1,
              }}
            >
              Sign in
            </button>

            <div className="divider text-center text-white mb-2">
              or continue with
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                className="sbtn flex items-center justify-center gap-2 bg-white border rounded-lg py-2"
                type="button"
                aria-label="Continue with Google"
                onClick={() => demoAuth("Google")}
              >
                <img src={GoogleIcon} alt="github icon" className="w-5 h-5" />
                Google
              </button>
              <button
                className="sbtn flex items-center justify-center gap-2 bg-white border rounded-lg py-2"
                type="button"
                aria-label="Continue with GitHub"
                onClick={() => demoAuth("GitHub")}
              >
                <img src={GitHubIcon} alt="github icon" className="w-5 h-5" />
                GitHub
              </button>
            </div>

            <div
              id="error"
              role="alert"
              aria-live="polite"
              style={{
                color: success ? "var(--ok)" : "var(--danger)",
                fontSize: ".92rem",
                margin: "12px 2px 0",
                minHeight: "1.2em",
              }}
            >
              {error}
            </div>

            <div className=" text-center mt-2">
              No account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Demo only 🙂");
                }}
                className=" text-white"
              >
                Create one
              </a>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
