import { useUserAuth } from "@/context/GroupContext";
import Dashboard from "./dashboard";
import MemberGroupPage from "./membergrouppage";
import Login from "@/components/Login";
import MemberLoginPage from "./memberloginpage";

export default function Home() {
  const { isAdminLoggedIn, isMemberLoggedIn } = useUserAuth();
  return (
    <div>
      {isAdminLoggedIn && <Dashboard />}
      {isMemberLoggedIn && <MemberGroupPage />}
      {!isAdminLoggedIn && !isMemberLoggedIn && (
        <div>
          <Login />
          <MemberLoginPage />
        </div>
      )}
    </div>
  );
}
