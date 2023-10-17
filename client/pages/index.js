import { useUserAuth } from "@/context/GroupContext";
import Dashboard from "./dashboard";
import MemberGroupPage from "./membergrouppage";
import AdminLogin from "@/components/Login/AdminLogin";
// import MemberLoginPage from "./memberloginpage";
import MemberLogin from "@/components/Login/MemberLogin";

export default function Home() {
  const { isAdminLoggedIn, isMemberLoggedIn } = useUserAuth();
  return (
    <div>
      {isAdminLoggedIn && <Dashboard />}
      {isMemberLoggedIn && <MemberGroupPage />}
      {!isAdminLoggedIn && !isMemberLoggedIn && (
        <div>
          <AdminLogin />
          <MemberLogin />
        </div>
      )}
    </div>
  );
}
