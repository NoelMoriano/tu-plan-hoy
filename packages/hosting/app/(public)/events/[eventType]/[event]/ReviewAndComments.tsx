import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export const ReviewAndComments = () => {
  return (
    <div className="w-full">
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
