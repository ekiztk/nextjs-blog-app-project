import { FormControlItem, MenuItem, Option } from "./types";

export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "blogs",
    label: "Blogs",
    path: "/blogs",
  },
  {
    id: "search",
    label: "Search",
    path: "/search",
  },
];

// export const categories: Option[] = [
//   {
//     value: "life",
//     label: "Life",
//   },
//   {
//     value: "software",
//     label: "Software",
//   },
//   {
//     value: "tech",
//     label: "Technology",
//   },
//   {
//     value: "science",
//     label: "Science",
//   },
// ];

export const formControls: FormControlItem[] = [
  {
    id: "title",
    label: "Title",
    placeholder: "Enter Blog Title",
    type: "text",
    component: "input",
    options: [],
  },
  {
    id: "content",
    label: "Content",
    placeholder: "Enter Blog Content",
    type: "text",
    component: "textarea",
    options: [],
  },
  {
    id: "category",
    label: "Category",
    placeholder: "Choose Blog Category",
    type: "",
    component: "select",
    options: [],
  },
];

export const firebaseConfig = {
  apiKey: "AIzaSyD2QZz_Opq2BYHKyTG9XKg5NAee7iykGrc",
  authDomain: "nextjs-blog-d6881.firebaseapp.com",
  projectId: "nextjs-blog-d6881",
  storageBucket: "nextjs-blog-d6881.appspot.com",
  messagingSenderId: "455797745397",
  appId: "1:455797745397:web:54f33ba215252c7cfdc7bc",
  measurementId: "G-9R2SBZ3D47",
};

export const initialBlogFormData = {
  title: "",
  content: "",
  image: "",
  category: "",
};
