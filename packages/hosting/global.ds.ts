type RoleCode = "super_admin" | "user";
type CurrencyCode = "PEN" | "USD";

type SelectOption = {
  label: string | React.ReactNode;
  value: string;
};

interface _Image {
  createAt: any;
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

type Image = Omit<_Image, "createAt"> & { createAt: Date };

interface Archive {
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

interface DefaultFirestoreProps {
  createAt: any;
  updateAt: any;
  updateBy: string;
  isDeleted: boolean;
  createBy?: string;
}

interface SearchKey {
  text?: string;
  maps?: boolean;
  filters: {
    price?: { min: string; max: string };
    categories?: string[];
    dates?: { key: string; dateStart: string; dateEnd: string };
    location?: { z: number; center: { lat: number; lng: number } };
    city?: string[];
  };
  page?: number;
  country?: string;
}

interface User extends DefaultFirestoreProps {
  id: string;
  acls: string[];
  roleCode: RoleCode;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  password: string;
  document: Document;
  phone: Phone;
  iAcceptPrivacyPolicies: boolean;
  profilePhoto?: Image;
  dniPhoto?: {
    front: Image;
    back: Image;
  };
  address?: boolean;
  updateBy: string;
}

interface Company extends DefaultFirestoreProps {
  id: string;
  nameId: string;
  active: boolean;
  isHighlighted?: boolean;
  searchData: string[];
  name: string;
  categoryIds: string[];
  categories: Category[];
  phone: Phone;
  wsp: Phone;
  wspNumber: string;
  city: string;
  address: string;
  reference: string;
  userId: string;
  document: Document;
  youTubeVideoUrl: string;
  description: string;
  logo: Image;
  coverImage: Image;
  gallery: string;
  socialMedia: {
    facebook: Social;
    tiktok: Social;
    instagram: Social;
    x: Social;
    linkedin: Social;
  };
}

interface Advertisement extends DefaultFirestoreProps {
  id: string;
  nameId: string;
  active: boolean;
  isHighlighted?: boolean;
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

interface Category extends DefaultFirestoreProps {
  id: string;
  name: string;
  nameId: string;
}

interface Hit {
  active: boolean;
  categoryIds: string[];
  categories: Category[];
  logo: Image;
  coverImage: Image;
  id: string;
  isDeleted: boolean;
  isHighlighted: boolean;
  name: string;
  nameId: string;
  objectID: string;
  path: string;
  searchData: string[];
}
