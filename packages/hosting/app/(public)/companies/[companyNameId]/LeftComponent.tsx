"use client";
import React from "react";
import Image from "next/image";
import { CarouselGallery } from "@/app/(public)/events/[eventType]/[event]/CarouselGallery";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export const LeftComponent = () => {
  return (
    <div className="w-full grid place-items-center px-4">
      <Image
        src="/images/ads-banner.png"
        width={733}
        height={458}
        sizes="10"
        alt="Tu plan hoy - logo"
        className="object-contain rounded-[1em] mb-8"
      />
      <div className="w-full titles text-primary mb-8">
        <h2 className="text-[20px] md:text-[40px] font-semibold">
          20-21 de Septiembre
        </h2>
        <span className="text-[16px] md:text-[20px]">
          De 12:00 AM a 6:00 AM
        </span>
        <h1 className="text-[48px] md:text-[90px] font-semibold leading-[1.3em]">
          Noche de fiesta
        </h1>
        <span className="text-[14px] md:text-[20px]">
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
                  target="_blank"
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
                  target="_blank"
                  className="text-secondary font-bold"
                >
                  Rombai
                </a>
                ,&nbsp;
                <a
                  href="http://www.cmtv.com.ar/biografia/show.php?bnid=313&amp;banda=Alejandro_Lerner"
                  target="_blank"
                  className="text-secondary font-bold"
                >
                  Alejandro Lerner
                </a>
                &nbsp;y&nbsp;
                <a
                  href="http://www.cmtv.com.ar/biografia/show.php?bnid=2419&amp;banda=El_Polaco"
                  target="_blank"
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
          <div className="video-card overflow-hidden rounded-[10px]">
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
    </div>
  );
};
