"use client";
import React from "react";
import Image from "next/image";
import { CarouselGallery } from "@/app/(public)/events/[eventType]/[event]/CarouselGallery";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Button } from "@/components/ui/Button";

export const LeftComponent = () => {
  return (
    <div className="w-full grid justify-center px-4">
      <Image
        src="/images/ads-banner.png"
        width={733}
        height={458}
        sizes="10"
        alt="Tu plan hoy - logo"
        className="object-contain rounded-[1em] mb-8"
      />
      <div className="titles text-primary mb-8">
        <h2 className="text-[40px] font-semibold">20-21 de Septiembre</h2>
        <span className="text-[20px]">De 12:00 AM a 6:00 AM</span>
        <h1 className="text-[90px] font-semibold leading-[1.3em]">
          Noche de fiesta
        </h1>
        <span className="text-[20px]">
          Organizado por{" "}
          <strong className="text-secondary font-bold">Bizarro</strong>{" "}
        </span>
      </div>
      <div className="categories mb-8">
        <div className="text-[16px] text-primary font-semibold mb-2">
          Categorias:
        </div>
        <div className="w-full flex gap-3 flex-wrap">
          <div className="w-auto h-[37px] bg-tertiary px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
            <span>Música Electrónica</span>
          </div>
          <div className="w-auto h-[37px] bg-tertiary px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
            <span>Exclusivas</span>
          </div>
          <div className="w-auto h-[37px] bg-tertiary px-6 text-secondary font-bold grid place-items-center rounded-[5px]">
            <span>Música Electrónica</span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="event-description mb-[2em]">
          <h3 className="text-[16px] text-primary font-bold mb-[.5em]">
            Descripción del evento:
          </h3>
          <pre className="text-[18px] text-primary font-[500] font-['Urbanist'] whitespace-pre-wrap">
            <p>
              Con un estilo que transmite diversión y alegría para toda la
              familia, Márama se convirtió rápidamente en una de las bandas más
              importantes de Latinoamérica con éxitos como "
              <em>Todo comenzó bailando</em>", "<em>Loquita</em>" y "
              <em>Nena</em>".
            </p>
          </pre>
        </div>
        <div className="event-additional-information mb-[2em]">
          <h3 className="text-[16px] text-primary font-bold mb-[.5em]">
            Información adicional :
          </h3>
          <pre className="text-[16px] text-primary font-[500] font-['Urbanist'] whitespace-pre-wrap">
            <div>
              <p>
                El primer sencillo que lanzaron fue “Loquita”. Lo siguieron
                “Todo Comenzó Bailando” y “No Te Vayas” en agosto de 2014. Estas
                canciones le dieron repercusión al grupo y empezaron a sonar en
                todo el país vecino, realizando fiestas privadas y distintos
                eventos. Más tarde, en octubre, llegó “Una Noche Contigo” y en
                diciembre “Bronceado“, ambos éxitos.
                <br />
                <br />
                El 16 de abril de 2015 Márama lanzó “Nena”, revolucionando las
                redes sociales. En mayo estrenan “Noche Loca”, en colaboración
                con&nbsp;
                <a
                  href="http://www.cmtv.com.ar/biografia/show.php?bnid=2388"
                  className="text-secondary font-bold"
                >
                  Rombai
                </a>
                .<br />
                <br />
                El 19 de enero de 2016 lanzan el sencillo "Era Tranquila".
                Durante este año Agustín Casanova forma parte del elenco de
                Bailando Por Un Sueño en Showmatc, junto a otros colegas, entre
                ellos Fer Vázquez de&nbsp;
                <a
                  href="http://www.cmtv.com.ar/biografia/show.php?bnid=2388"
                  className="text-secondary font-bold"
                >
                  Rombai
                </a>
                ,&nbsp;
                <a
                  href="http://www.cmtv.com.ar/biografia/show.php?bnid=313&amp;banda=Alejandro_Lerner"
                  className="text-secondary font-bold"
                >
                  Alejandro Lerner
                </a>
                &nbsp;y&nbsp;
                <a
                  href="http://www.cmtv.com.ar/biografia/show.php?bnid=2419&amp;banda=El_Polaco"
                  className="text-secondary font-bold"
                >
                  El Polaco
                </a>
                . El 25 de julio presentan "Lo Intentamos", nuevo tema.
                <br />
                <br />
                El 5 de mayo de 2017 lanzan "La Quiero Conocer", un single con
                un estribillo muy pegadizo. A fines de 2018 la banda se separa y
                Agustín Casanova continúa su carrera en solitario.
                <br />
                <br />
                Durante los años siguientes la banda publica varios singles.
              </p>

              <p>En cabina Dj Luigi y Dj Ayona.</p>
            </div>
          </pre>
        </div>
      </div>
      <div className="w-full my-8">
        <h3 className="text-primary font-bold text-[16px] mb-6">
          Fotos del sitio:
        </h3>
        <CarouselGallery />
        <div className="w-full my-4">
          <div className="video-card overflow-hidden rounded-[5px]">
            <LiteYouTubeEmbed
              id="0eHll6VMN6g"
              adNetwork={true}
              title="La mejor musica en bizarro"
              iframeClass="w-full h-full"
              poster="maxresdefault"
            />
          </div>
        </div>
      </div>
      <div className="w-full my-8 text-primary mb-8">
        <h3 className="text-primary font-bold text-[16px] mb-6">
          Calificaciones y opiniones de lugar:
        </h3>
        <div className="w-full flex justify-between gap-16 grid-cols-[1fr,70%]">
          <div>
            <span className="text-[16px]">Valoración media</span>
            <div className="flex gap-2">
              <strong className="font-bold text-[40px]">4.94</strong>
              <div className="stars flex items-center gap-2 text-secondary">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
                    fill="#6E3FCB"
                  />
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
                    fill="#6E3FCB"
                  />
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
                    fill="#6E3FCB"
                  />
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
                    fill="#6E3FCB"
                  />
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
                    fill="#6E3FCB"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full">
            <ul className="list-none grid gap-3">
              <li>
                <div className="item flex gap-4">
                  <div>
                    <span className="text-[20px] font-bold">5</span>
                  </div>
                  <div className="bar w-full">
                    <div className="mb-1">
                      <div className="item-bar w-full h-[14px] bg-quaternary rounded-[5px] overflow-hidden relative before:contents-[''] before:absolute before:inset-0 before:w-[90%] before:h-full before:rounded-[5px] before:bg-secondary"></div>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[12px] font-medium">
                        1050 votos
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item flex gap-4">
                  <div>
                    <span className="text-[20px] font-bold">4</span>
                  </div>
                  <div className="bar w-full">
                    <div className="mb-1">
                      <div className="item-bar w-full h-[14px] bg-quaternary rounded-[5px] overflow-hidden relative before:contents-[''] before:absolute before:inset-0 before:w-[50%] before:h-full before:rounded-[5px] before:bg-secondary"></div>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[12px] font-medium">589 votos</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item flex gap-4">
                  <div>
                    <span className="text-[20px] font-bold">3</span>
                  </div>
                  <div className="bar w-full">
                    <div className="mb-1">
                      <div className="item-bar w-full h-[14px] bg-quaternary rounded-[5px] overflow-hidden relative before:contents-[''] before:absolute before:inset-0 before:w-[20%] before:h-full before:rounded-[5px] before:bg-secondary"></div>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[12px] font-medium">20 votos</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item flex gap-4">
                  <div>
                    <span className="text-[20px] font-bold">2</span>
                  </div>
                  <div className="bar w-full">
                    <div className="mb-1">
                      <div className="item-bar w-full h-[14px] bg-quaternary rounded-[5px] overflow-hidden relative before:contents-[''] before:absolute before:inset-0 before:w-[10%] before:h-full before:rounded-[5px] before:bg-secondary"></div>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[12px] font-medium">7 votos</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item flex gap-4">
                  <div>
                    <span className="text-[20px] font-bold">1</span>
                  </div>
                  <div className="bar w-full">
                    <div className="mb-1">
                      <div className="item-bar w-full h-[14px] bg-quaternary rounded-[5px] overflow-hidden relative before:contents-[''] before:absolute before:inset-0 before:w-[3%] before:h-full before:rounded-[5px] before:bg-secondary"></div>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[12px] font-medium">1 votos</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full mb-8">
        <div className="comments grid gap-[2em]">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="comment-item text-primary grid grid-cols-[auto,1fr] gap-8"
            >
              <div className="avatar">
                <Image
                  src="/images/avatar.webp"
                  width={80}
                  height={80}
                  alt="avatar"
                  className="w-[80px] h-[80px] object-cover rounded-[50%]"
                />
              </div>
              <div className="detail">
                <div className="w-full">
                  <span className="text-[16px] font-semibold">
                    Emilia Hernández
                  </span>
                </div>
                <div className="calification flex gap-1 items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
                      fill="#231473"
                      className="text-primary"
                    />
                  </svg>
                  <span className="text-[14px]">4</span>
                </div>
                <div className="comment">
                  <p className="text-[14px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full grid place-items-center py-9">
          <Button variant="tertiary" className="px-8">
            Cargar más opiniones
          </Button>
        </div>
      </div>
    </div>
  );
};
