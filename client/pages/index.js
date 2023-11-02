import { useUserAuth } from "@/context/GroupContext";
import Dashboard from "./dashboard";
import MemberGroupPage from "./membergrouppage";
import AdminLogin from "@/components/Login/AdminLogin";
import MemberLogin from "@/components/Login/MemberLogin";

export default function Home() {
  const { isAdminLoggedIn, isMemberLoggedIn } = useUserAuth();

  if (isAdminLoggedIn) {
    return <Dashboard />;
  } else if (isMemberLoggedIn) {
    return <MemberGroupPage />;
  } else {
    return (
      <div>
        <AdminLogin />
        {/* <MemberLogin /> */}
      </div>
    );
  }
}
