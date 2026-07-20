import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";


function CreateGiveaway() {

  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [deadline, setDeadline] = useState("");


  const createGiveaway = async (e) => {

    e.preventDefault();


    try {

      await addDoc(collection(db, "giveaways"), {

        title,
        prize,
        description,
        image,
        deadline,
        createdAt: serverTimestamp()

      });


      alert("Giveaway created successfully 🎉");


      setTitle("");
      setPrize("");
      setDescription("");
      setImage("");
      setDeadline("");


    } catch(error) {

      alert(error.message);

    }

  };


  return (

    <div className="min-h-screen bg-green-950 flex items-center justify-center px-4">


      <form
        onSubmit={createGiveaway}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-lg border border-white/20"
      >


        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Create Giveaway
        </h1>


        <input
          className="w-full p-3 rounded-lg mb-4"
          placeholder="Giveaway Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />


        <input
          className="w-full p-3 rounded-lg mb-4"
          placeholder="Prize Amount"
          value={prize}
          onChange={(e)=>setPrize(e.target.value)}
        />


        <input
          className="w-full p-3 rounded-lg mb-4"
          placeholder="Image URL"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
        />


        <input
          className="w-full p-3 rounded-lg mb-4"
          placeholder="Deadline"
          value={deadline}
          onChange={(e)=>setDeadline(e.target.value)}
        />


        <textarea
          className="w-full p-3 rounded-lg mb-6"
          placeholder="Description"
          rows="4"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />


        <button
          className="w-full bg-yellow-400 text-green-900 py-3 rounded-xl font-bold"
        >
          Create Giveaway
        </button>


      </form>


    </div>

  );

}


export default CreateGiveaway;