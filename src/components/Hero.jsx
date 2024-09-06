import HeroImg from "../assets/HeroImg0.jpg";
import HeroImg1 from "../assets/HeroImg1.jpg";
import HeroImg2 from "../assets/HeroImg2.jpg";
import HeroImg3 from "../assets/HeroImg3.jpg";
import HeroImg4 from "../assets/HeroImg4.jpg";
import HeroImg5 from "../assets/HeroImg5.jpg";
import HeroImg6 from "../assets/HeroImg6.jpg";
import HeroImg7 from "../assets/HeroImg7.jpg";
import HeroImg8 from "../assets/HeroImg8.jpg";
import { Link } from "react-router-dom";

const images = [
  HeroImg8,
  HeroImg7,
  HeroImg6,
  HeroImg5,
  HeroImg4,
  HeroImg3,
  HeroImg2,
  HeroImg,
  HeroImg1,
];

function Hero() {
  return (
    <div className="hero animated-background bg-none min-h-screen font-inter">
      <div className="area z-50">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse justify-center items-center ">
        <div className="grid grid-cols-3 gap-4 h-full">
          {images.map((src, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
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
          <Link to="/signin">
            <button className="btn btn-primary bg-gradient-to-l from-indigo-400 to-cyan-400 text-white text-xl border-none">
              Únete ahora
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
