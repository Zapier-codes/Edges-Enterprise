import { create } from "zustand";
import axios from "axios";


// Default service catalog shown until the backend-managed list loads
// (or if a call fails / returns empty), so the Services page always
// reflects the full range of software development work we do.
export const DEFAULT_SERVICES = [
  { id: 1, icon: "webDev", name: "Web Development", description: "Fast, scalable websites and web apps built on modern frameworks, from marketing sites to complex internal tools." },
  { id: 2, icon: "design", name: "Web Design & UI/UX", description: "Interfaces designed around how people actually use them — wireframes, prototypes, and design systems that hold up at scale." },
  { id: 3, icon: "mobile", name: "Mobile App Development", description: "Native iOS and Android apps, and cross-platform builds with React Native, shipped to the App Store and Google Play." },
  { id: 4, icon: "custom", name: "Custom Software Development", description: "Bespoke systems built around your workflow instead of the other way around, from internal tools to full products." },
  { id: 5, icon: "cart", name: "E-Commerce Development", description: "Storefronts, checkout flows, and platform integrations (Shopify, custom carts) built to convert and scale." },
  { id: 6, icon: "cloud", name: "Cloud & DevOps", description: "Cloud architecture, CI/CD pipelines, and infrastructure-as-code on AWS, GCP, and Azure that scale with demand." },
  { id: 7, icon: "api", name: "API Development & Integration", description: "REST and GraphQL APIs, third-party integrations, and the plumbing that lets your systems talk to each other." },
  { id: 8, icon: "qa", name: "QA & Software Testing", description: "Manual and automated testing — unit, integration, end-to-end — so releases ship with confidence, not crossed fingers." },
  { id: 9, icon: "enterprise", name: "Enterprise Software Solutions", description: "ERP, CRM, and workflow platforms built to handle real organizational complexity and integrate with legacy systems." },
  { id: 10, icon: "strategy", name: "Product Strategy & Consulting", description: "Technical discovery, architecture reviews, and roadmapping to de-risk a build before a line of code is written." },
  { id: 11, icon: "data", name: "Data Engineering & Analytics", description: "Pipelines, warehousing, and dashboards that turn raw data into something a team can actually act on." },
  { id: 12, icon: "support", name: "Maintenance & Support", description: "Ongoing monitoring, patching, and feature work after launch, so the product keeps pace with the business." },
];

// Default testimonials shown until real client reviews load from the backend.
export const DEFAULT_REVIEWS = [
  { _id: "seed-1", user: { name: "Amara Okafor" }, createdAt: "2026-05-12T00:00:00.000Z", review: "They rebuilt our checkout flow in six weeks and conversion went up almost immediately. Communication was clear the entire way through.", service: { name: "E-Commerce Development" } },
  { _id: "seed-2", user: { name: "Daniel Reyes" }, createdAt: "2026-03-04T00:00:00.000Z", review: "We came in with a rough idea and left with a production app. The team pushed back on scope when it mattered, which saved us months.", service: { name: "Mobile App Development" } },
  { _id: "seed-3", user: { name: "Priya Sharma" }, createdAt: "2026-01-22T00:00:00.000Z", review: "Our old system couldn't handle our growth. The migration to a proper cloud architecture was smooth and downtime was close to zero.", service: { name: "Cloud & DevOps" } },
  { _id: "seed-4", user: { name: "Michael Chen" }, createdAt: "2025-11-09T00:00:00.000Z", review: "Solid engineering and even better project management. We always knew exactly where things stood.", service: { name: "Custom Software Development" } },
];

// Default portfolio entries shown until real project data loads from the backend.
export const DEFAULT_PORTFOLIO = [
  { _id: "seed-p1", name: "FinFlow — Payments Dashboard", description: "A real-time analytics and reconciliation dashboard for a mid-size payments processor, built on a React + microservices stack." },
  { _id: "seed-p2", name: "Northgate — Logistics Platform", description: "End-to-end shipment tracking and route optimization system replacing a decade-old legacy tool." },
  { _id: "seed-p3", name: "Verda — E-Commerce Rebuild", description: "A full storefront and checkout rebuild that cut page load times by more than half and lifted conversion." },
  { _id: "seed-p4", name: "Atlas Health — Patient Portal", description: "A HIPAA-conscious patient scheduling and records portal built for a multi-clinic healthcare network." },
];

const useStore = create((set) => ({
  services: DEFAULT_SERVICES,
  data: null,
  getAllServices: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/services`);
      const doc = response.data.data.doc;
      set({ services: doc && doc.length ? doc : DEFAULT_SERVICES });
    } catch (error) {
      set({ services: DEFAULT_SERVICES });
    }
  },
  products: DEFAULT_PORTFOLIO,
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
      const doc = response.data.data.doc;
      set({ products: doc && doc.length ? doc : DEFAULT_PORTFOLIO });
    } catch (error) {
      set({ products: DEFAULT_PORTFOLIO });
    }
  },
  postLoginData: async (loginData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        loginData,{withCredentials:true}
        );      
        localStorage.setItem('role',response.data.data.role)
        await useStore.getState().getUserImage(response.data.data.id)
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  postSignUpData: async (signupData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        signupData,{withCredentials:true}
      );
      set({ data: await response.data });
    } catch (error) {
      throw error;
    }
  },
  patchUpdatePassword: async (updateData) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/users/updatePassword`,
        updateData,{withCredentials:true}
        );
      } catch (error) {
      console.log(error);
      throw error;
    }
  },
  reviews: DEFAULT_REVIEWS,
  getAllReviews:async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/testimonials`,
      );
      const doc = response.data.data.doc;
      set({ reviews: doc && doc.length ? doc : DEFAULT_REVIEWS });
    } catch (error) {
      set({ reviews: DEFAULT_REVIEWS });
    }
  },
  isLoggedIn:false,
  setIsLoggedIn:(isLoggedIn)=>set({isLoggedIn}),

  postServiceData:async (serviceData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/services/`,
        serviceData,{withCredentials:true}
      );
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  postProductData:async (productData) => {
    try {
       await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/products/`,
        productData,{withCredentials:true}
      );
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  patchUpdatePicture:async (picture) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/users/`,
        picture,{withCredentials:true}
      );
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  userImg:null,
  getUserImage:async(name)=>{
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/image/user/${name}`,
        {responseType: 'arraybuffer',withCredentials:true},
        
      );
      const fileBlob = new Blob([response.data]);
          set({userImg: URL.createObjectURL(fileBlob)}) 
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getServiceImage:async(name)=>{
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/image/service/${name}`, {
          
            responseType: 'arraybuffer', // Set the response type to 'arraybuffer'
          
        });
      
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  postForgotPassword:async(email)=>{
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/forgotPassword`, email);
      
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  patchResetPassword:async(token,data)=>{
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/users/resetPassword/${token}`, data);
      
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}));
export default useStore;
