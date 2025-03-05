type RoleCode = "super_admin" | "user";
type CurrencyCode = "PEN" | "USD";

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

interface DefaultFirestoreProps {
  createAt: any;
  updateAt: any;
  updateBy: string;
  isDeleted: boolean;
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

interface Company extends DefaultFirestoreProps {
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
  logo: Image;
  sitePhoto: Image;
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

interface Advertisement extends DefaultFirestoreProps {
  id: string;
  name: string;
  adImage: Image;
  address: string;
  description: string;
  company: Company;
  user: User;
}
