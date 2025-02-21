import React from "react";

export const userPermissions = [
  {
    id: "termsAndConditions",
    label: (
      <span>
        He leído y acepto los{" "}
        <a href="#" target="_blank">
          Términos y Condiciones
        </a>
      </span>
    ),
  },
  {
    id: "webPrivacyPolicy",
    label: (
      <span>
        He leído y acepto los términos y condiciones para el tratamiento de mis
        datos personales contenidos en la{" "}
        <a href="#" target="_blank">
          Política de Privacidad Web
        </a>{" "}
      </span>
    ),
  },
  {
    id: "iDeclareThatTheInformationIsTrueAndComplete",
    label: (
      <span>
        He leído y acepto los términos y condiciones para publicar mi evento.
        Declaro que he proporcionado información veraz, completa y actualizada
        sobre mis datos de identificación y asumo responsabilidad por ello.
        (Para mayor información revisar{" "}
        <a href="#" target="_blank">
          Términos y Condiciones
        </a>
        )
      </span>
    ),
  },
  {
    id: "iConfirmMyUsageRights",
    label: (
      <span>
        Confirmo que tengo los derechos de uso de la información y las imágenes
        que subiré en la plataforma, así como el consentimiento de uso de datos
        personales de terceros, autorizando a JOINNUS para su divulgación
        conforme a los Términos y Condiciones.
      </span>
    ),
  },
];
