import NoteImg from "../assets/firma (1).svg";
import NewPostImg from "../assets/newpostImg.png";

function Hero() {
  return (
    <div className="hero animated-background bg-gradient-to-r from-indigo-400 to-cyan-400 min-h-screen pt-40 lg:pt-10 font-inter">
      <div className="hero-content flex-col lg:flex-row-reverse justify-center items-center ">
        <div className="bg-white relative lg:translate-x-24 w-full lg:w-1/2 flex justify-center lg:block">
          <img
            src="https://i.pinimg.com/564x/a1/40/37/a14037d51cb82beea0799e775332e6d1.jpg"
            className="max-w-xs sm:max-w-sm h-auto m-2 p-5 pb-10 mb-16 mx-auto lg:mx-0"
          />
          <img
            src={NewPostImg}
            className="max-w-xs sm:max-w-sm h-auto absolute m-2 p-5 pb-10 mb-10 -top-20 right-0 lg:-right-20 mx-auto lg:mx-0"
          />
          <img
            src={NoteImg}
            className="w-max-md absolute -bottom-0 right-0 lg:-right-6 mx-auto lg:mx-0"
          />
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold text-white">
            Comparte los momentos más especiales con quienes más te importan.
          </h1>
          <p className="text-2xl lg:text-3xl py-6 text-white">
            Captura y comparte tus recuerdos favoritos en nuestra red social de
            imágenes. Conéctate con amigos y familiares a través de fotos y
            comentarios. ¡Haz que cada instante cuente y mantén vivas tus
            conexiones!
          </p>
          <button className="btn btn-primary bg-pink-500 text-white text-xl border-none">
            Únete ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
