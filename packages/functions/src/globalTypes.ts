export type Timestamp = FirebaseFirestore.Timestamp;

type OmitDefaultFirestoreProps<T> = Omit<T, keyof PickDefaultFirestoreProps>;

type PickDefaultFirestoreProps = Pick<
  DefaultFirestoreProps,
  "createAt" | "isDeleted" | "updateAt"
>;

interface DefaultFirestoreProps {
  createAt: Timestamp;
  updateAt: Timestamp;
  updateBy: string;
  isDeleted: boolean;
}

export type RoleCode = "super_admin" | "user";
export type CurrencyCode = "PEN" | "USD";

export interface _Image {
  createAt: Timestamp;
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

export type Image = Omit<_Image, "createAt"> & { createAt: Date };

export interface Archive {
  name: string;
  status?: string;
  uid: string;
  url: string;
}

export interface User extends DefaultFirestoreProps {
  id: string;
  acls: string[];
  roleCode: RoleCode;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  password: string;
  document: {
    type: string;
    number: string;
  };
  phone: {
    prefix: string;
    number: string;
  };
  iAcceptPrivacyPolicies: boolean;
  profilePhoto?: Image;
  dniPhoto?: Image;
  address?: boolean;
  updateBy: string;
}

export interface Company extends DefaultFirestoreProps {
  id: string;
  nameId: string;
  searchData: string[];
  active: boolean;
  commercialName: string;
  categoryIds: string[];
  phone: {
    prefix: string;
    number: string;
  };
  wspNumber: string;
  city: string;
  address: string;
  reference: string;
  userId: string;
  document: {
    type: string;
    number: string;
  };
  ytVideoUrl: string;
  description: string;
  logo: string;
  sitePhoto: string;
  gallery: string;
  socialMedia: {
    facebook: {
      name: string;
      url: string;
    };
    tiktok: {
      name: string;
      url: string;
    };
    instagram: {
      name: string;
      url: string;
    };
    x: {
      name: string;
      url: string;
    };
    linkedin: {
      name: string;
      url: string;
    };
  };
}

export interface Advertisement extends DefaultFirestoreProps {
  id: string;
  adImage: Image;
  title: string;
  address: string;
  overview: string;
  company: Company;
  user: User;
}
