interface Media {
  url?: string;
  alt?: string;
}

interface UserImage {
  url: string;
  alt: string;
}

export interface AuthState {
  token: string | null;
  user: {
    name: string;
    email: string;
    bio: string | null;
    venueManager: boolean;
    avatar: UserImage;
    banner: UserImage;
  } | null;
  setAuth: (token: string, user: AuthState['user']) => void;
  clearAuth: () => void;
}

export interface Profile {
  name: string;
  email: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  venueManager: boolean;
}

export interface ProfileUpdate {
  bio?: string;
  avatar?: Media;
  banner?: Media;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  venueManager?: boolean;
}

export interface LoginUser {
  email: RegisterUser['email'];
  password: RegisterUser['password'];
}

export interface LoginResponseData {
  name: string;
  email: string;
  avatar: UserImage;
  banner: UserImage;
  accessToken: string;
  venueManager: boolean;
}

export interface LoginResponse {
  data: LoginResponseData;
  meta: unknown;
}

export interface RegisterResponse {
  data: Omit<LoginResponseData, 'accessToken'>;
  meta: unknown;
}

export type LoginFormProps = {
  onClose: () => void;
  onSwitch: () => void;
};
