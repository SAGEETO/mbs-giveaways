import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";


function AdminRoute({ children }) {


  const [user, setUser] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {


      if(currentUser){


        setUser(currentUser);



        const userDoc = await getDoc(

          doc(db, "users", currentUser.uid)

        );



        if(userDoc.exists() && userDoc.data().role === "admin"){

          setIsAdmin(true);

        }


      }


      setLoading(false);


    });



    return () => unsubscribe();


  }, []);




  if(loading){

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );

  }




  if(!user || !isAdmin){

    return <Navigate to="/" />;

  }



  return children;


}


export default AdminRoute;