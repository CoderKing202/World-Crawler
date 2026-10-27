import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home({isLogin}) {

  const navigate = useNavigate();
  useEffect(() => {
    /** it is so that is not logged out user or user who don't have an account can access these components */
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);
    const fileId = "YOUR_VIDEO_FILE_ID";
  return (
    <div style={{ marginTop: 150 }}>

      
    </div>
  );
}

export default Home;
