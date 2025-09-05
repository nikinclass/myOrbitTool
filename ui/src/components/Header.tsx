import { useState } from "react";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const [testPayload, setTestPayload] = useState("");

  const testTheAPI = async () => {
    const res = await fetch("/api/example");
    const json = await res.json();
    setTestPayload(json.hello); // Expect "world"
  };

  return (
    <>
      <h1>Header</h1>
      <div className={`flex justify-evenly border p-4 ${className ?? ""}`}>
        <h1>Logo</h1>
        <button
          className="rounded-full bg-black text-white cursor-pointer p-4"
          onClick={testTheAPI}
        >
          Test API
        </button>
        <p>
          API Response: {testPayload && `${testPayload}`}
          {!testPayload && "failed to fetch"}
        </p>
      </div>
    </>
  );
};
