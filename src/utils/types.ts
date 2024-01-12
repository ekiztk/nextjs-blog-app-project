import { Category, Comment, User } from "@prisma/client";

export interface MenuItem {
  id: string;
  label: string;
  path: string;
}

export interface Option {
  id: number;
  label: string;
  value: string;
}

export interface FormControlItem {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  component: string;
  options: Option[];
}

export interface BlogFormData {
  title: string;
  content: string;
  image: string;
  category: string;
}

export interface PostData {
  id: number;
  slug?: string;
  title: string;
  content: string;
  image: string;
  category: { value: string; label: string };
  author: { name: string; email: string; image: string };
  createDate?: Date;
  lastModifyDate?: Date;
  comments: {
    content: string;
    createDate: Date;
    author: { name: string; email: string; image: string };
  }[];
}

export interface UserProps {
  email: string;
  name: string;
  aboutMe: string;
  birthDate: string;
  registerDate?: string;
  image: string;
  age?: Number;
  membershipDuration?: Number;
}
