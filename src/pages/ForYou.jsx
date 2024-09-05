import { useState } from "react";
import Post from "../components/Post";
import ModalNewPost from "../components/ModalNewPost";

function ForYou() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Post />
      <button
        className="bg-gradient-to-r from-indigo-400 to-cyan-400 fixed bottom-5 right-5 font-bold  text-xl rounded-full w-12 h-12 flex items-center justify-center text-white hover:cursor-pointer hover:bg-orange-400"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>
      <ModalNewPost isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default ForYou;
