"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { services as defaultServices, Service } from "@/data/services";
import { projects as defaultProjects, Project } from "@/data/projects";
import { blogs as defaultBlogs, Blog } from "@/data/blogs";
import { faqs as defaultFaqs, FAQ } from "@/data/faqs";
import { trackingData as defaultShipments, TrackingStatus, TrackingTimelineItem } from "@/data/tracking";
import { fetchAllDataAction, syncDatabaseAction, DBStructure } from "@/lib/db-store";
import { triggerQuoteSubmittedNotifications, triggerShipmentUpdatedNotifications } from "@/lib/notification";

// Data Types
export type QuoteRequest = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceType: string;
  freightType: string;
  cargoDescription: string;
  weight: string;
  volume: string;
  quantity: string;
  pickupAddress: string;
  destinationAddress: string;
  preferredPickupDate: string;
  deliveryUrgency: 'Standard' | 'Express' | 'Super Express';
  status: 'New' | 'Reviewed' | 'Contacted' | 'Accepted' | 'Rejected' | 'Closed' | 'Archived';
  assignedTo: string;
  internalNote: string;
  createdDate: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'Read' | 'Replied' | 'Archived' | 'Spam';
  replies: { date: string; content: string }[];
  createdDate: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Marketing' | 'Customer Support' | 'Shipment Operator' | 'Content Editor' | 'Finance' | 'Viewer';
  status: 'Active' | 'Inactive';
  lastLogin: string;
};

export type SystemSettings = {
  companyName: string;
  companyTagline: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  officeHours: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  trackingPrefix: string;
  quotePrefix: string;
  maintenanceMode: boolean;
};

export type AuditLog = {
  id: string;
  adminUser: string;
  action: string;
  module: string;
  description: string;
  ipAddress: string;
  createdDate: string;
};

interface AdminStateContextType {
  quotes: QuoteRequest[];
  shipments: TrackingStatus[];
  messages: ContactMessage[];
  services: Service[];
  projects: Project[];
  blogs: Blog[];
  faqs: FAQ[];
  subscribers: string[];
  users: AdminUser[];
  settings: SystemSettings;
  auditLogs: AuditLog[];
  currentAdmin: AdminUser | null;
  
  // Actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addQuote: (quote: Omit<QuoteRequest, "id" | "status" | "assignedTo" | "internalNote" | "createdDate">) => string;
  updateQuoteStatus: (id: string, status: QuoteRequest["status"], assignedTo?: string, internalNote?: string) => void;
  addMessage: (message: Omit<ContactMessage, "id" | "status" | "replies" | "createdDate">) => void;
  updateMessageStatus: (id: string, status: ContactMessage["status"], replyContent?: string) => void;
  addShipment: (shipment: Omit<TrackingStatus, "timeline">) => void;
  updateShipmentStatus: (id: string, status: TrackingStatus["status"], currentLocation: string, checkpointDetails?: string) => void;
  addSubscriber: (email: string) => "success" | "duplicate";
  removeSubscriber: (email: string) => void;
  
  // CMS Actions
  saveService: (service: Service) => void;
  saveProject: (project: Project) => void;
  saveBlog: (blog: Blog) => void;
  saveFaq: (faq: FAQ) => void;
  deleteService: (id: string) => void;
  deleteProject: (id: string) => void;
  deleteBlog: (id: string) => void;
  deleteFaq: (id: string) => void;
  
  // System Actions
  saveSettings: (settings: SystemSettings) => void;
  addUser: (user: Omit<AdminUser, "id" | "lastLogin">) => void;
  updateUserStatus: (id: string, status: 'Active' | 'Inactive') => void;
  addAudit: (action: string, module: string, description: string) => void;
}

const AdminStateContext = createContext<AdminStateContextType | undefined>(undefined);

const defaultSettings: SystemSettings = {
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

const defaultUsers: AdminUser[] = [
  { id: "usr-1", name: "Super Admin", email: "admin@bylian.com", role: "Super Admin", status: "Active", lastLogin: "2026-05-24 17:30" },
  { id: "usr-2", name: "Budi Santoso", email: "budi@bylian.com", role: "Shipment Operator", status: "Active", lastLogin: "2026-05-24 09:15" },
  { id: "usr-3", name: "Siti Rahma", email: "siti@bylian.com", role: "Customer Support", status: "Active", lastLogin: "2026-05-24 11:20" },
  { id: "usr-4", name: "Diana Putri", email: "diana@bylian.com", role: "Marketing", status: "Active", lastLogin: "2026-05-23 15:40" }
];

export const AdminStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [shipments, setShipments] = useState<TrackingStatus[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);

  // Initialize States from Database Action / LocalStorage fallback
  useEffect(() => {
    const initData = async () => {
      try {
        const data = await fetchAllDataAction();
        if (data) {
          setQuotes(data.quotes || []);
          setShipments(data.shipments || []);
          setMessages(data.messages || []);
          setServices(data.services || []);
          setProjects(data.projects || []);
          setBlogs(data.blogs || []);
          setFaqs(data.faqs || []);
          setSubscribers(data.subscribers || []);
          setUsers(data.users || []);
          setSettings(data.settings || defaultSettings);
          setAuditLogs(data.auditLogs || []);
        }
      } catch (error) {
        console.error("Failed to load server database, falling back to localStorage:", error);
        
        // Fallback to client-side localStorage
        if (typeof window !== "undefined") {
          const localServices = localStorage.getItem("bylian_services");
          if (localServices) setServices(JSON.parse(localServices));
          else setServices(defaultServices);

          const localProjects = localStorage.getItem("bylian_projects");
          if (localProjects) setProjects(JSON.parse(localProjects));
          else setProjects(defaultProjects);

          const localBlogs = localStorage.getItem("bylian_blogs");
          if (localBlogs) setBlogs(JSON.parse(localBlogs));
          else setBlogs(defaultBlogs);

          const localFaqs = localStorage.getItem("bylian_faqs");
          if (localFaqs) setFaqs(JSON.parse(localFaqs));
          else setFaqs(defaultFaqs);

          const localShipments = localStorage.getItem("bylian_shipments");
          if (localShipments) setShipments(JSON.parse(localShipments));
          else setShipments(defaultShipments);

          const localQuotes = localStorage.getItem("bylian_quotes");
          if (localQuotes) setQuotes(JSON.parse(localQuotes));

          const localMessages = localStorage.getItem("bylian_messages");
          if (localMessages) setMessages(JSON.parse(localMessages));

          const localSubs = localStorage.getItem("bylian_subscribers");
          if (localSubs) setSubscribers(JSON.parse(localSubs));
          else setSubscribers(["info@nusantararetail.com", "contact@globaltrading.sg", "retailer@partner.co.id"]);

          const localUsers = localStorage.getItem("bylian_users");
          if (localUsers) setUsers(JSON.parse(localUsers));
          else setUsers(defaultUsers);

          const localSettings = localStorage.getItem("bylian_settings");
          if (localSettings) setSettings(JSON.parse(localSettings));
          else setSettings(defaultSettings);

          const localAudits = localStorage.getItem("bylian_audit_logs");
          if (localAudits) setAuditLogs(JSON.parse(localAudits));
          else setAuditLogs([{
            id: "aud-0",
            adminUser: "System Initialize",
            action: "Initialize",
            module: "System Core",
            description: "Bylian Logistic system database initialized on the client side.",
            ipAddress: "127.0.0.1",
            createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
          }]);
        }
      }
    };

    initData();

    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("bylian_admin_session");
      if (logged) setCurrentAdmin(JSON.parse(logged));
    }
  }, []);

  // Sync state helpers
  const saveState = async (key: string, data: any) => {
    // 1. Write to local storage (instant fallback)
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }

    // 2. Fetch, merge, and save to server database
    try {
      const db = await fetchAllDataAction();
      const mappedKeyMap: { [key: string]: keyof DBStructure } = {
        "bylian_quotes": "quotes",
        "bylian_shipments": "shipments",
        "bylian_messages": "messages",
        "bylian_services": "services",
        "bylian_projects": "projects",
        "bylian_blogs": "blogs",
        "bylian_faqs": "faqs",
        "bylian_subscribers": "subscribers",
        "bylian_users": "users",
        "bylian_settings": "settings",
        "bylian_audit_logs": "auditLogs",
      };

      const dbKey = mappedKeyMap[key];
      if (dbKey) {
        (db as any)[dbKey] = data;
        await syncDatabaseAction(db);
      }
    } catch (err) {
      console.error("Failed to sync updated state with server database:", err);
    }
  };

  const addAudit = (action: string, module: string, description: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      adminUser: currentAdmin ? currentAdmin.name : "Guest/User",
      action,
      module,
      description,
      ipAddress: "192.168.1.104",
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    const updated = [newLog, ...auditLogs];
    setAuditLogs(updated);
    saveState("bylian_audit_logs", updated);
  };

  // Auth Operations
  const login = (email: string, password: string): boolean => {
    // Standard mock verification
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser && foundUser.status === "Active" && password === "admin123") {
      const updatedUser = { ...foundUser, lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16) };
      
      // Update users last login
      const updatedUsers = users.map(u => u.id === foundUser.id ? updatedUser : u);
      setUsers(updatedUsers);
      saveState("bylian_users", updatedUsers);

      setCurrentAdmin(updatedUser);
      saveState("bylian_admin_session", updatedUser);
      
      // Add audit log
      const newLog: AuditLog = {
        id: `aud-${Date.now()}`,
        adminUser: updatedUser.name,
        action: "Login Success",
        module: "Authentication",
        description: `User ${updatedUser.name} logged in successfully with role ${updatedUser.role}.`,
        ipAddress: "192.168.1.104",
        createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      const updatedAudits = [newLog, ...auditLogs];
      setAuditLogs(updatedAudits);
      saveState("bylian_audit_logs", updatedAudits);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentAdmin) {
      addAudit("Logout", "Authentication", `${currentAdmin.name} logged out.`);
    }
    setCurrentAdmin(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bylian_admin_session");
    }
  };

  // User Actions
  const addQuote = (quote: Omit<QuoteRequest, "id" | "status" | "assignedTo" | "internalNote" | "createdDate">): string => {
    const randId = Math.floor(1000 + Math.random() * 9000);
    const newId = `${settings.quotePrefix}${randId}`;
    
    const newQuote: QuoteRequest = {
      ...quote,
      id: newId,
      status: "New",
      assignedTo: "Unassigned",
      internalNote: "",
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    const updated = [newQuote, ...quotes];
    setQuotes(updated);
    saveState("bylian_quotes", updated);
    
    addAudit("Create Quote", "Quotes Management", `New quote request submitted by ${quote.name} (${newId}).`);
    
    // Trigger automated email & WhatsApp notifications
    triggerQuoteSubmittedNotifications(newQuote).catch(err => 
      console.error("Failed to trigger quote notification:", err)
    );

    return newId;
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest["status"], assignedTo?: string, internalNote?: string) => {
    const updated = quotes.map(q => {
      if (q.id === id) {
        return {
          ...q,
          status,
          assignedTo: assignedTo !== undefined ? assignedTo : q.assignedTo,
          internalNote: internalNote !== undefined ? internalNote : q.internalNote
        };
      }
      return q;
    });
    setQuotes(updated);
    saveState("bylian_quotes", updated);
    
    addAudit("Update Quote", "Quotes Management", `Quote ${id} status updated to '${status}'.`);
  };

  const addMessage = (message: Omit<ContactMessage, "id" | "status" | "replies" | "createdDate">) => {
    const newMessage: ContactMessage = {
      ...message,
      id: `MSG-${Date.now().toString().slice(-4)}`,
      status: "New",
      replies: [],
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    saveState("bylian_messages", updated);
    
    addAudit("Receive Contact Message", "Contact Inquiries", `New message received from ${message.name} with subject '${message.subject}'.`);
  };

  const updateMessageStatus = (id: string, status: ContactMessage["status"], replyContent?: string) => {
    const updated = messages.map(m => {
      if (m.id === id) {
        const replies = m.replies;
        if (replyContent) {
          replies.push({
            date: new Date().toISOString().substring(0, 10),
            content: replyContent
          });
        }
        return {
          ...m,
          status,
          replies
        };
      }
      return m;
    });
    setMessages(updated);
    saveState("bylian_messages", updated);
    
    addAudit("Update Message", "Contact Inquiries", `Message ${id} status updated to '${status}'${replyContent ? ' and reply sent.' : '.'}`);
  };

  const addShipment = (shipment: Omit<TrackingStatus, "timeline">) => {
    const newShipment: TrackingStatus = {
      ...shipment,
      timeline: [
        {
          status: "Shipment Created",
          location: shipment.origin,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          time: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
        }
      ]
    };

    const updated = [newShipment, ...shipments];
    setShipments(updated);
    saveState("bylian_shipments", updated);
    
    addAudit("Create Shipment", "Shipments & Tracking", `New shipment generated with ID ${shipment.id} from ${shipment.origin} to ${shipment.destination}.`);
  };

  const updateShipmentStatus = (id: string, status: TrackingStatus["status"], currentLocation: string, checkpointDetails?: string) => {
    const updated = shipments.map(s => {
      if (s.id === id) {
        const timeLog = {
          status: checkpointDetails || status,
          location: currentLocation,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          time: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
        };
        return {
          ...s,
          status,
          currentLocation,
          timeline: [timeLog, ...s.timeline]
        };
      }
      return s;
    });
    setShipments(updated);
    saveState("bylian_shipments", updated);
    
    addAudit("Update Shipment", "Shipments & Tracking", `Shipment ${id} status updated to '${status}' at ${currentLocation}.`);
    
    // Trigger automated email & WhatsApp tracking updates
    triggerShipmentUpdatedNotifications(id, status, currentLocation, checkpointDetails).catch(err =>
      console.error("Failed to trigger shipment tracking update notification:", err)
    );
  };

  const addSubscriber = (email: string): "success" | "duplicate" => {
    const emailNorm = email.toLowerCase().trim();
    if (subscribers.includes(emailNorm)) {
      return "duplicate";
    }
    const updated = [emailNorm, ...subscribers];
    setSubscribers(updated);
    saveState("bylian_subscribers", updated);
    
    addAudit("Add Subscriber", "Newsletter Subscriptions", `New email subscription added: ${emailNorm}.`);
    return "success";
  };

  const removeSubscriber = (email: string) => {
    const updated = subscribers.filter(s => s !== email);
    setSubscribers(updated);
    saveState("bylian_subscribers", updated);
    addAudit("Remove Subscriber", "Newsletter Subscriptions", `Subscriber removed: ${email}.`);
  };

  // CMS Actions
  const saveService = (service: Service) => {
    const exists = services.some(s => s.id === service.id);
    let updated: Service[];
    if (exists) {
      updated = services.map(s => s.id === service.id ? service : s);
      addAudit("Edit Service", "CMS Content", `Service '${service.title}' details updated.`);
    } else {
      updated = [...services, service];
      addAudit("Create Service", "CMS Content", `New service '${service.title}' added.`);
    }
    setServices(updated);
    saveState("bylian_services", updated);
  };

  const saveProject = (project: Project) => {
    const exists = projects.some(p => p.id === project.id);
    let updated: Project[];
    if (exists) {
      updated = projects.map(p => p.id === project.id ? project : p);
      addAudit("Edit Case Study", "CMS Content", `Project '${project.title}' details updated.`);
    } else {
      updated = [project, ...projects];
      addAudit("Create Case Study", "CMS Content", `New Project study '${project.title}' published.`);
    }
    setProjects(updated);
    saveState("bylian_projects", updated);
  };

  const saveBlog = (blog: Blog) => {
    const exists = blogs.some(b => b.id === blog.id);
    let updated: Blog[];
    if (exists) {
      updated = blogs.map(b => b.id === blog.id ? blog : b);
      addAudit("Edit Blog Post", "CMS Content", `Blog article '${blog.title}' edited.`);
    } else {
      updated = [blog, ...blogs];
      addAudit("Publish Blog Post", "CMS Content", `New blog article '${blog.title}' published.`);
    }
    setBlogs(updated);
    saveState("bylian_blogs", updated);
  };

  const saveFaq = (faq: FAQ) => {
    const exists = faqs.some(f => f.id === faq.id);
    let updated: FAQ[];
    if (exists) {
      updated = faqs.map(f => f.id === faq.id ? faq : f);
      addAudit("Edit FAQ Accordion", "CMS FAQ Content", `FAQ question '${faq.question}' updated.`);
    } else {
      updated = [...faqs, faq];
      addAudit("Create FAQ Accordion", "CMS FAQ Content", `New FAQ Accordion item added.`);
    }
    setFaqs(updated);
    saveState("bylian_faqs", updated);
  };

  const deleteService = (id: string) => {
    const sName = services.find(s => s.id === id)?.title || id;
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    saveState("bylian_services", updated);
    addAudit("Delete Service", "CMS Content", `Service '${sName}' removed.`);
  };

  const deleteProject = (id: string) => {
    const pName = projects.find(p => p.id === id)?.title || id;
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    saveState("bylian_projects", updated);
    addAudit("Delete Case Study", "CMS Content", `Case Study '${pName}' removed.`);
  };

  const deleteBlog = (id: string) => {
    const bName = blogs.find(b => b.id === id)?.title || id;
    const updated = blogs.filter(b => b.id !== id);
    setBlogs(updated);
    saveState("bylian_blogs", updated);
    addAudit("Delete Blog Post", "CMS Content", `Blog article '${bName}' deleted.`);
  };

  const deleteFaq = (id: string) => {
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    saveState("bylian_faqs", updated);
    addAudit("Delete FAQ", "CMS FAQ Content", `FAQ ID ${id} deleted.`);
  };

  // Settings
  const saveSettings = (newSettings: SystemSettings) => {
    setSettings(newSettings);
    saveState("bylian_settings", newSettings);
    addAudit("Save System Settings", "Global Configurations", `Contact info & company variables updated.`);
  };

  // User list updates
  const addUser = (newUser: Omit<AdminUser, "id" | "lastLogin">) => {
    const u: AdminUser = {
      ...newUser,
      id: `usr-${Date.now().toString().slice(-4)}`,
      lastLogin: "Never"
    };
    const updated = [...users, u];
    setUsers(updated);
    saveState("bylian_users", updated);
    addAudit("Add Admin User", "User Security Accounts", `New user ${newUser.name} created as role ${newUser.role}.`);
  };

  const updateUserStatus = (id: string, status: 'Active' | 'Inactive') => {
    const updated = users.map(u => u.id === id ? { ...u, status } : u);
    setUsers(updated);
    saveState("bylian_users", updated);
    
    const uName = users.find(u => u.id === id)?.name || id;
    addAudit("Modify User Status", "User Security Accounts", `User ${uName} status changed to ${status}.`);
  };

  return (
    <AdminStateContext.Provider
      value={{
        quotes,
        shipments,
        messages,
        services,
        projects,
        blogs,
        faqs,
        subscribers,
        users,
        settings,
        auditLogs,
        currentAdmin,
        login,
        logout,
        addQuote,
        updateQuoteStatus,
        addMessage,
        updateMessageStatus,
        addShipment,
        updateShipmentStatus,
        addSubscriber,
        removeSubscriber,
        saveService,
        saveProject,
        saveBlog,
        saveFaq,
        deleteService,
        deleteProject,
        deleteBlog,
        deleteFaq,
        saveSettings,
        addUser,
        updateUserStatus,
        addAudit
      }}
    >
      {children}
    </AdminStateContext.Provider>
  );
};

export const useAdminState = () => {
  const context = useContext(AdminStateContext);
  if (context === undefined) {
    throw new Error("useAdminState must be used within an AdminStateProvider");
  }
  return context;
};
