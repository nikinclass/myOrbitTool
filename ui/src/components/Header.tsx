import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/Logout";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`flex absolute z-2 w-full bg-white justify-evenly border p-2 ${className ?? ""}`}>
        <img src="/space.png" className="p-0 h-15"/>
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
