import { useUserContext } from "../context/UserContext";

const Dashboard = () => {

  const {user} = useUserContext()
    return (
      <>
        <h1>{user.displayName }</h1>
      </>
    );
};

export default Dashboard;
