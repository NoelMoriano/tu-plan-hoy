import React from "react";
import { Building2Icon, File, FilesIcon, LockKeyhole } from "lucide-react";

interface Menu {
  id: string;
  icon: React.ReactNode;
  name: string;
  url: string;
}

export const MenuList: Menu[] = [
  {
    id: "personal_information",
    icon: <File className="text-primary" />,
    name: "Información personal",
    url: "/profile?type=personal_information",
  },
  {
    id: "privacy_and_security",
    icon: <LockKeyhole className="text-primary" />,
    name: "Privacidad y seguridad",
    url: "/profile?type=privacy_and_security",
  },
  {
    id: "my_companies",
    icon: <Building2Icon className="text-primary" />,
    name: "Mis empresas",
    url: "/profile?type=my_companies",
  },
  {
    id: "my_ads",
    icon: <FilesIcon className="text-primary" />,
    name: "Mis anuncios",
    url: "/profile?type=my_ads",
  },
];
