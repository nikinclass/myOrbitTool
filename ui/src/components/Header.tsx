import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/Logout";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`flex justify-evenly border p-4 ${className ?? ""}`}>
        <h1>Logo</h1>
        <button
          className="rounded-full bg-black text-white cursor-pointer p-4 p-x-15"
          onClick={() => navigate("/login")}
        >
          Login Page
        </button>

        <button
          className="rounded-full bg-black text-white cursor-pointer p-4 p-x-15"
          onClick={() => navigate("/signup")}
        >
          SignUp Page
        </button>

        <LogoutButton />
      </div>
    </>
  );
};
