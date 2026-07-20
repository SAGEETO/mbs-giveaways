import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";


function ProtectedRoute({ children }) {

  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setChecking(false);

    });


    return () => unsubscribe();

  }, []);



  if(checking){

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }


  if(!user){

    return <Navigate to="/login" />;

  }


  return children;

}


export default ProtectedRoute;