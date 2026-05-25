"use server";

import fs from "fs";
import path from "path";
import { services as defaultServices } from "@/data/services";
import { projects as defaultProjects } from "@/data/projects";
import { blogs as defaultBlogs } from "@/data/blogs";
import { faqs as defaultFaqs } from "@/data/faqs";
import { trackingData as defaultShipments } from "@/data/tracking";

// Define path to local JSON database store
const DB_FILE_PATH = path.join(process.cwd(), "src", "data", "db-store.json");

// Database structure interface
export interface DBStructure {
  quotes: any[];
  shipments: any[];
  messages: any[];
  services: any[];
  projects: any[];
  blogs: any[];
  faqs: any[];
  subscribers: string[];
  users: any[];
  settings: any;
  auditLogs: any[];
}

const initialSettings = {
  companyName: "Bylian Logistic",
  companyTagline: "Transport Services",
  phone: "+62 812 3456 7890",
  email: "support@bylianlogistics.com",
  address: "Jl. Logistic Center No. 88, Jakarta, Indonesia",
  whatsapp: "6281234567890",
  officeHours: "Mon - Sat: 08:00 - 18:00",
  facebook: "#",
  instagram: "#",
  linkedin: "#",
  twitter: "#",
  trackingPrefix: "BYL-2026-",
  quotePrefix: "QTE-2026-",
  maintenanceMode: false
};

const initialUsers = [
  { id: "usr-1", name: "Super Admin", email: "admin@bylian.com", role: "Super Admin", status: "Active", lastLogin: "2026-05-24 17:30" },
  { id: "usr-2", name: "Budi Santoso", email: "budi@bylian.com", role: "Shipment Operator", status: "Active", lastLogin: "2026-05-24 09:15" },
  { id: "usr-3", name: "Siti Rahma", email: "siti@bylian.com", role: "Customer Support", status: "Active", lastLogin: "2026-05-24 11:20" },
  { id: "usr-4", name: "Diana Putri", email: "diana@bylian.com", role: "Marketing", status: "Active", lastLogin: "2026-05-23 15:40" }
];

// Helper to initialize and read database
export async function getDb(): Promise<DBStructure> {
  try {
    // Check if the directory exists
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Check if file exists, if not, create it with initial data
    if (!fs.existsSync(DB_FILE_PATH)) {
      const initialDb: DBStructure = {
        quotes: [],
        shipments: defaultShipments,
        messages: [],
        services: defaultServices,
        projects: defaultProjects,
        blogs: defaultBlogs,
        faqs: defaultFaqs,
        subscribers: ["info@nusantararetail.com", "contact@globaltrading.sg", "retailer@partner.co.id"],
        users: initialUsers,
        settings: initialSettings,
        auditLogs: [{
          id: "aud-0",
          adminUser: "System Initialize",
          action: "Initialize",
          module: "System Core",
          description: "Bylian Logistic local persistent file database initialized successfully.",
          ipAddress: "127.0.0.1",
          createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }]
      };
      
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialDb, null, 2), "utf8");
      return initialDb;
    }

    const fileContent = fs.readFileSync(DB_FILE_PATH, "utf8");
    return JSON.parse(fileContent) as DBStructure;
  } catch (error) {
    console.error("Failed to read local database store:", error);
    return {
      quotes: [],
      shipments: [],
      messages: [],
      services: [],
      projects: [],
      blogs: [],
      faqs: [],
      subscribers: [],
      users: [],
      settings: initialSettings,
      auditLogs: []
    };
  }
}

// Helper to save database data
export async function saveDb(data: DBStructure): Promise<boolean> {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Failed to write to local database store:", error);
    return false;
  }
}

// ==========================================
// SERVER ACTIONS FOR THE LOGISTICS DATABASE
// ==========================================

export async function fetchAllDataAction(): Promise<DBStructure> {
  return await getDb();
}

export async function syncDatabaseAction(data: DBStructure): Promise<boolean> {
  return await saveDb(data);
}
