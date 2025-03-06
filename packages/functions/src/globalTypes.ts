export type Timestamp = FirebaseFirestore.Timestamp;
export type RoleCode = "super_admin" | "user";
export type CurrencyCode = "PEN" | "USD";

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
  createBy?: string;
}

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

interface Phone {
  prefix: string;
  number: string;
}

interface Document {
  type: string;
  number: string;
}

interface Social {
  name: string;
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
  phone: Phone;
  wsp: Phone;
  city: string;
  address: string;
  reference: string;
  userId: string;
  document: Document;
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
  active: boolean;
  nameId: string;
  searchData: string[];
  advertisementSetup: {
    adImage: Image;
    youTubeVideoUrl: string;
    detail: {
      name: string;
      companyId: string;
      categoryIds: string[];
      description: string;
      additionalInformation: string;
      startDate: string;
      startTime: string;
      endDate: string;
      endTime: string;
      restriction: string;
    };
    location: {
      address: string;
      city: string;
      reference: string;
    };
    permissions: {
      iConfirmMyUsageRights: boolean;
      iDeclareThatTheInformationIsTrueAndComplete: boolean;
      termsAndConditions: boolean;
      webPrivacyPolicy: boolean;
    };
  };
}
