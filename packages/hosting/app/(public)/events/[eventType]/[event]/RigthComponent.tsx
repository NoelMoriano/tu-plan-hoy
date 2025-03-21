import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface Props {
  company: Company;
}

export const RightComponent = ({ company }: Props) => {
  const onGoToExternalUrl = () => {
    window.open(
      `https://wa.me/${company.wsp.prefix}${company.wsp.number}`,
      "_blank",
    );
  };

  return (
    <div className="w-full min-h-[100vh] px-4 relative md:sticky top-[10px]">
      <div className="cards-wrapper w-full h-auto">
        <div className="card w-full h-auto mb-5 bg-white py-5 px-7 rounded-[10px]">
          <h2 className="text-[24px] text-primary font-extrabold mb-4">
            ¡No te quedes fuera de la fiesta!
          </h2>
          <p className="text-[14px] text-secondary mb-4">
            {" "}
            <strong>Chatea con nosotros en WhatsApp</strong> para apartar tu
            lugar o recibir más info. ¡Tu noche épica comienza con un mensaje!
          </p>
          <Button
            variant="tertiary"
            className="w-full text-[14px] font-bold"
            onClick={() => onGoToExternalUrl()}
          >
            Ir al Whatsapp
          </Button>
        </div>
        <div className="card w-full h-auto relative bg-quaternary py-5 px-7 rounded-[10px] mb-4">
          <h2 className="text-[24px] text-primary font-bold mb-4">
            Ubicación del evento
          </h2>
          <div className="relative w-full h-auto grid place-items-center before:absolute before:content-[''] before:inset-0 before:w-full before:h-full before:bg-gradient-to-t before:bg-primary/40 before:to-transparent rounded-sm overflow-hidden mb-3">
            <Image
              src="/images/map-preview.png"
              width={400}
              height={300}
              alt="map - tu plan hoy"
              className="w-full h-full bg-opacity-5"
            />
            <a
              href={`https://www.google.com/maps/search/${company.address} - ${company.city}`}
              target="_blank"
              className="block absolute z-30"
            >
              <Button variant="tertiary">Ver en mapa</Button>
            </a>
          </div>
          <div className="text-[24px] text-primary font-bold">
            <span className="capitalize">{company.city}</span>, PE
          </div>
          <div className="text-[16px] text-primary">{company.address}</div>
        </div>
        <div className="card w-full h-auto relative bg-quaternary py-5 px-7 rounded-[10px] mb-10">
          <h2 className="text-[24px] text-primary font-bold mb-4">
            Redes sociales{" "}
          </h2>
          <div className="keywords">
            <div className="w-full flex gap-3 flex-wrap">
              {company?.wsp && (
                <a
                  href={`https://wa.me/${company.wsp.prefix}${company.wsp.number}`}
                  target="_blank"
                  className="w-auto h-[37px] bg-tertiary px-6 text-secondary font-bold flex items-center gap-2 rounded-[5px]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 18L1.26525 13.3778C0.484499 12.0247 0.0742498 10.491 0.0749998 8.91825C0.0772498 4.00125 4.07849 0 8.99473 0C11.3805 0.00075 13.62 0.93 15.3045 2.616C16.9882 4.302 17.9152 6.543 17.9145 8.9265C17.9122 13.8443 13.911 17.8455 8.99473 17.8455C7.50223 17.8448 6.03149 17.4705 4.72874 16.7595L0 18ZM4.94774 15.1448C6.20474 15.891 7.40473 16.338 8.99173 16.3387C13.0777 16.3387 16.4062 13.0133 16.4085 8.925C16.41 4.8285 13.0972 1.5075 8.99773 1.506C4.90874 1.506 1.5825 4.8315 1.581 8.919C1.58025 10.5878 2.06925 11.8372 2.89049 13.1445L2.14125 15.8805L4.94774 15.1448ZM13.488 11.0468C13.4325 10.9537 13.284 10.8982 13.0605 10.7865C12.8377 10.6748 11.742 10.1355 11.5372 10.0612C11.3332 9.987 11.1847 9.9495 11.0355 10.173C10.887 10.3958 10.4595 10.8982 10.3297 11.0468C10.2 11.1953 10.0695 11.214 9.84673 11.1023C9.62398 10.9905 8.90548 10.7557 8.05423 9.996C7.39198 9.405 6.94423 8.67525 6.81448 8.45175C6.68473 8.229 6.80098 8.10825 6.91198 7.99725C7.01248 7.8975 7.13473 7.737 7.24648 7.6065C7.35973 7.4775 7.39648 7.3845 7.47148 7.23525C7.54573 7.08675 7.50898 6.95625 7.45273 6.8445C7.39648 6.7335 6.95098 5.63625 6.76573 5.19C6.58424 4.75575 6.40049 4.81425 6.26399 4.8075L5.83649 4.8C5.68799 4.8 5.44649 4.8555 5.24249 5.079C5.03849 5.3025 4.46249 5.841 4.46249 6.93825C4.46249 8.0355 5.26124 9.09525 5.37224 9.24375C5.48399 9.39225 6.94348 11.6438 9.17923 12.609C9.71098 12.8385 10.1265 12.9757 10.4497 13.0785C10.9837 13.248 11.4697 13.224 11.8537 13.167C12.282 13.1032 13.1722 12.6277 13.3582 12.1073C13.5442 11.586 13.5442 11.1398 13.488 11.0468Z"
                      fill="#231473"
                    />
                  </svg>
                  <span>
                    {company.wsp.prefix} {company.wsp.number}
                  </span>
                </a>
              )}
              {company?.socialMedia?.instagram && (
                <a
                  href={company?.socialMedia?.instagram.url}
                  target="_blank"
                  className="w-auto h-[37px] bg-tertiary px-6 text-secondary font-bold flex items-center gap-2 rounded-[5px]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_299_897)">
                      <path
                        d="M9 1.6207C11.4047 1.6207 11.6895 1.63125 12.6352 1.67344C13.5141 1.71211 13.9887 1.85977 14.3051 1.98281C14.7234 2.14453 15.0258 2.34141 15.3387 2.6543C15.6551 2.9707 15.8484 3.26953 16.0102 3.68789C16.1332 4.0043 16.2809 4.48242 16.3195 5.35781C16.3617 6.30703 16.3723 6.5918 16.3723 8.99297C16.3723 11.3977 16.3617 11.6824 16.3195 12.6281C16.2809 13.507 16.1332 13.9816 16.0102 14.298C15.8484 14.7164 15.6516 15.0187 15.3387 15.3316C15.0223 15.648 14.7234 15.8414 14.3051 16.0031C13.9887 16.1262 13.5105 16.2738 12.6352 16.3125C11.6859 16.3547 11.4012 16.3652 9 16.3652C6.59531 16.3652 6.31055 16.3547 5.36484 16.3125C4.48594 16.2738 4.01133 16.1262 3.69492 16.0031C3.27656 15.8414 2.97422 15.6445 2.66133 15.3316C2.34492 15.0152 2.15156 14.7164 1.98984 14.298C1.8668 13.9816 1.71914 13.5035 1.68047 12.6281C1.63828 11.6789 1.62773 11.3941 1.62773 8.99297C1.62773 6.58828 1.63828 6.30351 1.68047 5.35781C1.71914 4.47891 1.8668 4.0043 1.98984 3.68789C2.15156 3.26953 2.34844 2.96719 2.66133 2.6543C2.97773 2.33789 3.27656 2.14453 3.69492 1.98281C4.01133 1.85977 4.48945 1.71211 5.36484 1.67344C6.31055 1.63125 6.59531 1.6207 9 1.6207ZM9 0C6.55664 0 6.25078 0.0105469 5.29102 0.0527344C4.33477 0.0949219 3.67734 0.249609 3.10781 0.471094C2.51367 0.703125 2.01094 1.00898 1.51172 1.51172C1.00898 2.01094 0.703125 2.51367 0.471094 3.1043C0.249609 3.67734 0.0949219 4.33125 0.0527344 5.2875C0.0105469 6.25078 0 6.55664 0 9C0 11.4434 0.0105469 11.7492 0.0527344 12.709C0.0949219 13.6652 0.249609 14.3227 0.471094 14.8922C0.703125 15.4863 1.00898 15.9891 1.51172 16.4883C2.01094 16.9875 2.51367 17.2969 3.1043 17.5254C3.67734 17.7469 4.33125 17.9016 5.2875 17.9437C6.24727 17.9859 6.55312 17.9965 8.99648 17.9965C11.4398 17.9965 11.7457 17.9859 12.7055 17.9437C13.6617 17.9016 14.3191 17.7469 14.8887 17.5254C15.4793 17.2969 15.982 16.9875 16.4813 16.4883C16.9805 15.9891 17.2898 15.4863 17.5184 14.8957C17.7398 14.3227 17.8945 13.6687 17.9367 12.7125C17.9789 11.7527 17.9895 11.4469 17.9895 9.00352C17.9895 6.56016 17.9789 6.2543 17.9367 5.29453C17.8945 4.33828 17.7398 3.68086 17.5184 3.11133C17.2969 2.51367 16.991 2.01094 16.4883 1.51172C15.9891 1.0125 15.4863 0.703125 14.8957 0.474609C14.3227 0.253125 13.6688 0.0984375 12.7125 0.05625C11.7492 0.0105469 11.4434 0 9 0Z"
                        fill="#231473"
                      />
                      <path
                        d="M9 4.37695C6.44766 4.37695 4.37695 6.44766 4.37695 9C4.37695 11.5523 6.44766 13.623 9 13.623C11.5523 13.623 13.623 11.5523 13.623 9C13.623 6.44766 11.5523 4.37695 9 4.37695ZM9 11.9988C7.34414 11.9988 6.00117 10.6559 6.00117 9C6.00117 7.34414 7.34414 6.00117 9 6.00117C10.6559 6.00117 11.9988 7.34414 11.9988 9C11.9988 10.6559 10.6559 11.9988 9 11.9988Z"
                        fill="#231473"
                      />
                      <path
                        d="M14.8852 4.19404C14.8852 4.7917 14.4 5.27334 13.8059 5.27334C13.2082 5.27334 12.7266 4.78819 12.7266 4.19404C12.7266 3.59639 13.2117 3.11475 13.8059 3.11475C14.4 3.11475 14.8852 3.5999 14.8852 4.19404Z"
                        fill="#231473"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_299_897">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>{company.socialMedia.instagram.name}</span>
                </a>
              )}

              {company?.socialMedia?.tiktok && (
                <a
                  href={company?.socialMedia?.tiktok.url}
                  target="_blank"
                  className="w-auto h-[37px] bg-tertiary px-6 text-secondary font-bold flex items-center gap-2 rounded-[5px]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8044 0H9.77086V12.2608C9.77086 13.7218 8.60414 14.9218 7.1522 14.9218C5.70025 14.9218 4.53352 13.7218 4.53352 12.2608C4.53352 10.8261 5.67433 9.65215 7.07443 9.6V6.52175C3.98904 6.5739 1.5 9.10435 1.5 12.2608C1.5 15.4435 4.04089 18 7.17814 18C10.3153 18 12.8562 15.4174 12.8562 12.2608V5.9739C13.997 6.8087 15.3971 7.30435 16.875 7.33045V4.25217C14.5934 4.17391 12.8044 2.29565 12.8044 0Z"
                      fill="#231473"
                    />
                  </svg>
                  <span>{company?.socialMedia?.tiktok.name}</span>
                </a>
              )}
              {company?.socialMedia?.facebook && (
                <a
                  href={company?.socialMedia?.facebook.url}
                  target="_blank"
                  className="w-auto h-[37px] bg-tertiary px-6 text-secondary font-bold flex items-center gap-2 rounded-[5px]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_299_903)">
                      <path
                        d="M9 0C4.02948 0 0 4.02948 0 9C0 13.2206 2.90592 16.7623 6.82596 17.735V11.7504H4.97016V9H6.82596V7.81488C6.82596 4.75164 8.21232 3.3318 11.2198 3.3318C11.79 3.3318 12.7739 3.44376 13.1764 3.55536V6.04836C12.964 6.02604 12.595 6.01488 12.1367 6.01488C10.661 6.01488 10.0908 6.57396 10.0908 8.02728V9H13.0306L12.5255 11.7504H10.0908V17.9341C14.5472 17.3959 18.0004 13.6015 18.0004 9C18 4.02948 13.9705 0 9 0Z"
                        fill="#231473"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_299_903">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>{company?.socialMedia?.facebook.name}</span>
                </a>
              )}
              {company?.socialMedia?.x && (
                <a
                  href={company?.socialMedia?.x.url}
                  target="_blank"
                  className="w-auto h-[37px] bg-tertiary px-6 text-secondary font-bold flex items-center gap-2 rounded-[5px]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_544_749"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="18"
                      height="18"
                    >
                      <path d="M0 0H18V18H0V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_544_749)">
                      <path
                        d="M14.175 0.843262H16.9354L10.9054 7.75269L18 17.1564H12.4457L8.09229 11.4543L3.11657 17.1564H0.353571L6.80271 9.76355L0 0.844547H5.69571L9.62486 6.05555L14.175 0.843262ZM13.2043 15.5004H14.7343L4.86 2.41312H3.21943L13.2043 15.5004Z"
                        fill="#231473"
                      />
                    </g>
                  </svg>

                  <span>{company?.socialMedia?.x.name}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
