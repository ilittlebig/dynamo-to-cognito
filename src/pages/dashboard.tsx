import { useNavigate } from 'react-router-dom';
import { signOut } from "src/services/authService";
import Button from "src/components/button";

const Dashboard = () => {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      await signOut();
      navigate("/sign-in");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div>
      Dashboard

      <Button
	label="Logga Ut"
	onClick={onClick}
      />
    </div>
  )
}

export default Dashboard;
