import React from "react";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

function Post() {
  return (
    <div className="card max-w-md mx-auto bg-base-100 shadow-xl my-40">
      <div className="card-body p-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src="/placeholder.svg?height=40&width=40" alt="@usuario" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">usuario123</p>
            <p className="text-xs text-base-content text-opacity-60">
              Ciudad, País
            </p>
          </div>
        </div>
      </div>
      <figure className="px-0 pt-0">
        <img
          src="/placeholder.svg?height=400&width=400"
          alt="Imagen de la publicación"
          className="w-full h-auto"
        />
      </figure>
      <div className="card-body p-4 pt-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            <button className="btn btn-ghost btn-square btn-sm">
              <HeartIcon className="h-6 w-6" />
            </button>
            <button className="btn btn-ghost btn-square btn-sm">
              <ChatBubbleOvalLeftIcon className="h-6 w-6" />
            </button>
            <button className="btn btn-ghost btn-square btn-sm">
              <PaperAirplaneIcon className="h-6 w-6" />
            </button>
          </div>
          <button className="btn btn-ghost btn-square btn-sm">
            <BookmarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="text-sm space-y-1">
          <p className="font-semibold">123 Me gusta</p>
          <p>
            <span className="font-semibold">usuario123</span> ¡Qué hermoso día
            para una aventura! 🌞🏞️ #naturaleza #aventura
          </p>
        </div>
        <div className="text-sm text-base-content text-opacity-60 space-y-1">
          <p>
            <span className="font-semibold">amigo1</span> ¡Increíble foto! 😍
          </p>
          <p>
            <span className="font-semibold">amigo2</span> Me encanta el paisaje.
            ¿Dónde es?
          </p>
        </div>
        <div className="flex gap-2 w-full mt-2">
          <input
            type="text"
            placeholder="Añade un comentario..."
            className="input input-bordered input-sm w-full"
          />
          <button className="btn btn-primary btn-sm">Publicar</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
