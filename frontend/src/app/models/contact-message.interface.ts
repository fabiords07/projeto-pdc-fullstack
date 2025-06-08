export interface ContactMessage {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  data: {
    id: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    created_at: string;
  };
}

export interface ContactError {
  message: string;
  errors: {
    [key: string]: string[];
  };
}