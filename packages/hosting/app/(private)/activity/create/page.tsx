"use client";

import { WrapperComponent } from "@/components/ui/WrapperComponent";
import React from "react";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePicker } from "@/components/ui/TimePicker";
import { Upload } from "@/components/ui/Upload";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { LocationMap } from "@/components/ui/LocationMap";

export default function CreateAds() {
  return (
    <div className="w-full">
      <WrapperComponent>
        <div className="content px-[1em] py-[2em]">
          <div className="titles grid gap-[.5em] mb-[1.5em]">
            <h1 className="text-[40px] font-bold text-primary">
              Registrar mi discoteca
            </h1>
            <p className="text-[16px] font-medium text-secondary w-full sm:w-[40em] leading-[1.2em]">
              <strong>Haz un evento inolvidable.</strong> Elige el nombre,
              selecciona la categoría y prepara los detalles. Mientras más
              descriptivo seas, mejor te irá en los anuncios
            </p>
          </div>
          <div className="step-1 mb-[3em]">
            <div className="title mb-[1.5em] grid grid-cols-[auto,1fr] gap-[1.5em] bg-quaternary w-full h-[87px] px-[1.5em] items-center rounded-[10px]">
              <div className="text-[32px] font-bold text-secondary">1</div>{" "}
              <div>
                <h2 className="text-[24px] md:text-[32px] font-bold text-primary leading-[1em]">
                  Detalles del anuncio
                </h2>
              </div>
            </div>
            <div className="content">
              <Form>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,30em] gap-[4em]">
                  <div className="left-items grid gap-[1em]">
                    <div>
                      <Input
                        label="Nombre del anuncio"
                        placeholder="Coloca un nombre corto y llamativo"
                      />
                    </div>
                    <div>
                      <Select
                        label="Escoge las categorías *"
                        options={[
                          {
                            label: "Discoteca",
                            value: "disco",
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <TextArea
                        label="Descripción del evento *"
                        placeholder="Coloca algo resumido"
                      />
                    </div>
                    <div>
                      <TextArea
                        label="Información adicional"
                        rows={8}
                        placeholder="Coloca con más detalle tu anuncio"
                      />
                    </div>

                    <div className="start-date grid grid-cols-[1fr,9em] items-end gap-[1em]">
                      <div>
                        <DatePicker label="Fecha de inicio *" />
                      </div>
                      <div>
                        <TimePicker />
                      </div>
                    </div>
                    <div className="end-date grid grid-cols-[1fr,9em] items-end gap-[1em]">
                      <div>
                        <DatePicker label="Fecha de finalización *" />
                      </div>
                      <div>
                        <TimePicker />
                      </div>
                    </div>
                  </div>
                  <div className="right-items h-auto grid gap-[2em]">
                    <div>
                      <Upload
                        label="Portada del anuncio *"
                        placeholder="Subir imagen (836 x 522 px)"
                      />
                    </div>
                    <div className="">
                      <Input
                        label="Video"
                        placeholder="Coloca el link de tu video de Youtube"
                      />
                      <div className="w-full my-4">
                        <LiteYouTubeEmbed
                          id="0eHll6VMN6g"
                          adNetwork={true}
                          title="La mejor musica en bizarro"
                          iframeClass="w-full h-full"
                          poster="maxresdefault"
                          wrapperClass="w-full max-w-[524px] h-[275px] rounded-[10px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="step-2">
            <div className="title mb-[1.5em] grid grid-cols-[auto,1fr] gap-[1.5em] bg-quaternary w-full h-[87px] px-[1.5em] items-center rounded-[10px]">
              <div className="text-[24px] md:text-[32px] font-bold text-secondary">
                2
              </div>{" "}
              <div>
                <h2 className="text-[32px] font-bold text-primary">
                  Ubicación
                </h2>
              </div>
            </div>
            <div className="content">
              <Form>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,30em] gap-[4em] mb-[1em]">
                  <div className="left-items flex flex-col gap-[1em]">
                    <div>
                      <Select
                        label="Cuidad *"
                        options={[
                          {
                            label: "Lima",
                            value: "lima",
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <Input
                        label="Dirección *"
                        placeholder="Describe dónde queda"
                      />
                    </div>
                    <div>
                      <Input
                        label="Referencia"
                        placeholder="Coloca referencias"
                      />
                    </div>
                  </div>
                  <div className="right-items h-auto">
                    <div className="mt-3">
                      <div className="mb-[1em] grid grid-cols-[auto,1fr] gap-[1.5em] bg-tertiary w-full h-[64px] px-[1.5em] items-center rounded-[10px]">
                        <Checkbox label="Usar la misma ubicación de tu empresa" />
                      </div>
                    </div>
                    <div className="grid gap-[1em]">
                      <LocationMap label="Ubicación en GPS" />
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="bottom-items text-primary">
            <div className="checkboxes grid gap-[.5em] mb-[2em]">
              <div>
                <Checkbox
                  label={
                    <span>
                      He leído y acepta los
                      <a href="#" className="font-bold">
                        Términos y Condiciones
                      </a>
                    </span>
                  }
                  htmlFor="terminos_y_condiciones"
                />
              </div>
              <div>
                <Checkbox
                  label={
                    <span>
                      Quiero recibir futuras promociones y noticias de
                      <a href="#" className="font-bold">
                        TuPlanHoy
                      </a>
                    </span>
                  }
                  htmlFor="terminos_y_condiciones"
                />
              </div>
            </div>
            <div className="mb-[1em]">
              <p className="text-secondary text-[14px]">
                ¡Después de crear tu evento podrás invitar a tus amigos y
                compartirla en tus redes sociales!
              </p>
            </div>
            <div>
              <Button className="w-full py-[1.1em]">Publicar anuncio</Button>
            </div>
          </div>
        </div>
      </WrapperComponent>
    </div>
  );
}
