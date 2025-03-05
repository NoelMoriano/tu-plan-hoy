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

interface Social {
  name: string;
  url: string;
}

export interface Company extends DefaultFirestoreProps {
  id: string;
  nameId: string;
  searchData: string[];
  active: boolean;
  name: string;
  categoryIds: string[];
  phone: {
    prefix: string;
    number: string;
  };
  wsp: {
    prefix: string;
    number: string;
  };
  city: string;
  address: string;
  reference: string;
  userId: string;
  document: {
    type: string;
    number: string;
  };
  youTubeVideoUrl: string;
  description: string;
  logo: string;
  coverImage: string;
  gallery: string;
  socialMedia: {
    facebook: Social;
    tiktok: Social;
    instagram: Social;
    x: Social;
    linkedin: Social;
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
