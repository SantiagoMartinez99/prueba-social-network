import React from "react";
import NewPostImg from "../assets/newpostImg.png";
import NoteImg from "../assets/firma (1).svg";

function Hero() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="bg-white relative">
          <img
            src="https://i.pinimg.com/564x/a1/40/37/a14037d51cb82beea0799e775332e6d1.jpg"
            className="max-w-sm h-auto  m-2 p-5 pb-10 mb-16"
          />
          <img
            src={NewPostImg}
            className="max-w-sm h-auto absolute m-2 p-5 pb-10 mb-10 -top-32 -right-20"
          />
          <img
            src={NoteImg}
            className="w-max-md  absolute -bottom-0 -right-6"
          />
        </div>
        <div>
          <h1 className="text-7xl font-bold">
            Comparte los momentos más especiales con quienes más te importan.
          </h1>
          <p className="text-3xl py-6">
            Captura y comparte tus recuerdos favoritos en nuestra red social de
            imágenes. Conéctate con amigos y familiares a través de fotos y
            comentarios. ¡Haz que cada instante cuente y mantén vivas tus
            conexiones!
          </p>
          <button className="btn btn-primary text-white text-xl">
            Unete ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
