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
      <h2>Google Drive Video Test</h2>

      <video
        controls
        width="300"
        height="500"
        src={`http://localhost:5000/video/1P24s5B1idN-urmnbKSUaq7_yZhpQ0p5Q`}
      />
    </div>
  );
}

export default Home;
