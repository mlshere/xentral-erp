
/** @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  RotateCcw, 
  Calculator, 
  BookOpen, 
  CreditCard, 
  Boxes, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Truck, 
  ShoppingCart, 
  Database,
  HelpCircle,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GLOSSARY, GlossaryTerm } from "./constants";

type Section = "intro" | "overview" | "flow" | "product" | "matrix" | "customer" | "returns" | "returns-flow" | "accounting" | "glossary" | "refunds" | "materials" | "samples" | "channels" | "questions";

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("intro");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sections = [
    { id: "intro", label: "Introduction", icon: LayoutDashboard },
    { id: "overview", label: "Xentral Overview", icon: Database },
    { id: "flow", label: "Information Flow", icon: ArrowRight },
    { id: "product", label: "Product Creation", icon: Package },
    { id: "matrix", label: "Matrix Products", icon: Boxes },
    { id: "customer", label: "Customer Sync", icon: Users },
    { id: "samples", label: "Samples & Influencers", icon: CheckCircle2 },
    { id: "returns-flow", label: "Returns & Refunds Flow", icon: RotateCcw },
    { id: "materials", label: "Stock & Inventory", icon: Boxes },
    { id: "channels", label: "Amazon & Shopware", icon: ShoppingCart },
    { id: "returns", label: "Returns & Credit Notes", icon: RotateCcw },
    { id: "accounting", label: "Accounting", icon: Calculator },
    { id: "refunds", label: "Refunds", icon: CreditCard },
    { id: "glossary", label: "Glossary (50 Terms)", icon: BookOpen },
    { id: "questions", label: "Questions & Next Steps", icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-gray-200 flex flex-col z-20"
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tight text-indigo-600"
            >
              Xentral Guide
            </motion.span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as Section)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                activeSection === section.id 
                  ? "bg-indigo-50 text-indigo-700 font-medium" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <section.icon size={20} className={activeSection === section.id ? "text-indigo-600" : ""} />
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {section.label}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className={`flex items-center gap-3 ${isSidebarOpen ? "p-2" : "justify-center"}`}>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              SM
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">Sherezade M.</span>
                <span className="text-xs text-gray-400">Junior Ecommerce Manager</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto p-8 md:p-12"
          >
            {activeSection === "intro" && <IntroSection />}
            {activeSection === "overview" && <OverviewSection />}
            {activeSection === "flow" && <FlowSection />}
            {activeSection === "product" && <ProductSection />}
            {activeSection === "matrix" && <MatrixSection />}
            {activeSection === "customer" && <CustomerSection />}
            {activeSection === "returns" && <ReturnsSection />}
            {activeSection === "returns-flow" && <ReturnsFlowSection />}
            {activeSection === "accounting" && <AccountingSection />}
            {activeSection === "refunds" && <RefundsSection />}
            {activeSection === "materials" && <MaterialsSection />}
            {activeSection === "samples" && <SamplesSection />}
            {activeSection === "channels" && <ChannelsSection />}
            {activeSection === "glossary" && <GlossarySection />}
            {activeSection === "questions" && <QuestionsSection />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function OverviewSection() {
  const modules = [
    { 
      title: "Sell (Verkauf)", 
      items: ["Sales Orders", "Products", "Contacts", "Offers"],
      desc: "Managing the entire quote-to-cash process across all channels."
    },
    { 
      title: "Stock (Lager)", 
      items: ["Delivery Note", "Warehouse Mgmt", "Dispatch Center", "Returns"],
      desc: "Tracking every movement of goods, from receipt to shipping."
    },
    { 
      title: "Buy (Einkauf)", 
      items: ["Purchase Orders", "Order Proposals", "Price Requests"],
      desc: "Automating reordering based on sales velocity and lead times."
    },
    { 
      title: "Accounting (Buchhaltung)", 
      items: ["Invoices", "Credit Memos", "Payment Reconciliation"],
      desc: "Pre-accounting and financial synchronization for tax advisors."
    }
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Xentral General Overview</h2>
        <p className="text-gray-500">The "Single Source of Truth" for our e-commerce operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-2 text-indigo-600">{mod.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{mod.desc}</p>
            <div className="flex flex-wrap gap-2">
              {mod.items.map((item, j) => (
                <span key={j} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] font-bold border border-gray-100">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
        <h3 className="text-2xl font-bold">Technical Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-sm">Modularity</h4>
            <p className="text-xs opacity-80">Start with Shopify/Warehouse, add Production or POS as we grow.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm">REST API</h4>
            <p className="text-xs opacity-80">Robust endpoints for custom integrations like Zen and HubSpot.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm">Automation</h4>
            <p className="text-xs opacity-80">"Process Starter" automates repetitive tasks like auto-invoicing.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm">Custom Apps</h4>
            <p className="text-xs opacity-80">New "Custom Discount App" handles complex B2B/Influencer pricing logic.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart className="text-indigo-600" size={24} />
          Shopify Connector Configuration
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Articles (Sync Articles)",
            "Stock Levels",
            "Orders (Import)",
            "Order Statuses",
            "Tracking Info",
            "Credit Memos"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <CheckCircle2 size={14} className="text-indigo-600" />
              <span className="text-xs font-medium text-indigo-900">{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400 italic">
          * The connector must stay "green" for synchronization to function.
        </p>
      </div>

      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
        <h4 className="text-orange-900 font-bold mb-2 flex items-center gap-2">
          <CheckCircle2 size={18} />
          Key Challenge: Master Data Discipline
        </h4>
        <p className="text-xs text-orange-800 leading-relaxed">
          The system is only as good as the data entered. Missing tariff numbers or EANs can break international shipping. <strong>Tax rates must be identical in both systems</strong>—Xentral for invoices and Shopify for VAT calculations. Nothing overrides the other.
        </p>
      </div>
    </div>
  );
}

function MatrixSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Matrix Products & Shopify Variants</h2>
        <p className="text-gray-500">Understanding the structure of complex product variations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Boxes className="text-indigo-600" size={24} />
            What is a Matrix Product?
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            In Xentral, a <strong>Matrix Product</strong> acts as an "umbrella" or container for products that have multiple attributes (e.g., Size, Flavor, Color). 
          </p>
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-900 uppercase mb-2">Key Characteristics:</h4>
            <ul className="space-y-2 text-xs text-indigo-800">
              <li className="flex items-center gap-2">• Parent-Child relationship</li>
              <li className="flex items-center gap-2">• Shared base information (Master Data)</li>
              <li className="flex items-center gap-2">• Individual SKUs for every variant</li>
              <li className="flex items-center gap-2">• Centralized stock management</li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
          <h3 className="text-xl font-bold">Why use it with Shopify?</h3>
          <p className="opacity-90 text-sm leading-relaxed">
            Shopify works with <strong>Variants</strong>. To maintain a clean storefront and accurate backend, we map Xentral Matrix structures to Shopify Product Variants.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">One Product Page</h4>
                <p className="text-xs opacity-70">Customers see one product with a dropdown, rather than 10 separate items.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Variant-Level Sync</h4>
                <p className="text-xs opacity-70">Stock is pushed from Xentral to the specific Shopify Variant ID, ensuring "Out of Stock" labels are accurate.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Clean Reporting</h4>
                <p className="text-xs opacity-70">Sales are tracked by the specific Variant SKU, allowing for precise demand forecasting.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
        <p className="text-sm text-gray-500 italic">
          "The Matrix is the container, but the <strong>Variants</strong> are what the customer actually buys and what Aliko actually ships."
        </p>
      </div>
    </div>
  );
}

function IntroSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Xentral ERP <span className="text-indigo-600">Integration</span> & Workflows
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          A comprehensive guide for the Lead Developer to understand the synchronization between Shopify, Xentral, and Zen (Aliko).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={20} />
            Key Objectives
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>• Understand end-to-end information flow</li>
            <li>• Master data management in Xentral</li>
            <li>• Accounting and refund processes</li>
            <li>• Inventory control and stock buffers</li>
          </ul>
        </div>
        <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-lg shadow-indigo-200">
          <h3 className="text-lg font-bold mb-4">Presentation Goal</h3>
          <p className="opacity-90 leading-relaxed">
            Bridge the gap between business operations (Junior Ecommerce Manager) and technical implementation (Lead Developer) to ensure a robust, scalable ERP setup.
          </p>
        </div>
      </div>
    </div>
  );
}

function FlowSection() {
  const steps = [
    { label: "Shopify", icon: ShoppingCart, desc: "Order placed", color: "text-green-600", bg: "bg-green-50", email: "Order Confirmation" },
    { label: "Xentral", icon: Database, desc: "Picks up order", color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Xentral", icon: Mail, desc: "Invoice & DN", color: "text-indigo-600", bg: "bg-indigo-50", email: "Invoice PDF" },
    { label: "Zen (Aliko)", icon: Truck, desc: "Fulfillment", color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Zen (Aliko)", icon: Mail, desc: "Shipping Conf", color: "text-orange-600", bg: "bg-orange-50", email: "Tracking Details" },
    { label: "Xentral", icon: CheckCircle2, desc: "Tracking Sync", color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Shopify", icon: ShoppingCart, desc: "Confirmation", color: "text-green-600", bg: "bg-green-50" },
    { label: "Klaviyo", icon: Mail, desc: "Marketing Flow", color: "text-pink-600", bg: "bg-pink-50", email: "Follow-up/E-book" },
  ];

  const radius = 220;
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Information Flow Cycle</h2>
        <p className="text-gray-500">A circular view of the data synchronization loop between systems.</p>
      </div>

      <div className="flex justify-center items-center py-10 overflow-visible">
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
          {/* Central Hub */}
          <div className="absolute w-32 h-32 rounded-full bg-white border-4 border-indigo-100 shadow-xl flex flex-col items-center justify-center z-10">
            <Database className="text-indigo-600 mb-1" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">Data Hub</span>
            <span className="text-xs font-black text-indigo-900">XENTRAL</span>
          </div>

          {/* Connection Lines/Arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 500 500">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
              </marker>
            </defs>
            
            {/* Animated Circular Path */}
            <circle 
              cx={centerX} 
              cy={centerY} 
              r={radius} 
              fill="none" 
              stroke="#E5E7EB" 
              strokeWidth="2" 
              strokeDasharray="8 8"
            />

            {/* Moving Arrows between steps */}
            {steps.map((_, idx) => {
              const startAngle = (idx * 360) / steps.length - 90;
              const endAngle = ((idx + 1) * 360) / steps.length - 90;
              
              // Calculate arc points
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              const x1 = centerX + (radius - 40) * Math.cos(startRad);
              const y1 = centerY + (radius - 40) * Math.sin(startRad);
              const x2 = centerX + (radius - 40) * Math.cos(endRad);
              const y2 = centerY + (radius - 40) * Math.sin(endRad);

              return (
                <motion.path
                  key={`arrow-${idx}`}
                  d={`M ${x1} ${y1} A ${radius - 40} ${radius - 40} 0 0 1 ${x2} ${y2}`}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.25,
                    ease: "linear"
                  }}
                />
              );
            })}
          </svg>

          {/* Step Nodes */}
          {steps.map((step, idx) => {
            const angle = (idx * 360) / steps.length - 90;
            const rad = (angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(rad);
            const y = centerY + radius * Math.sin(rad);

            return (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                style={{ 
                  left: x, 
                  top: y,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute group"
              >
                <div className={`w-16 h-16 rounded-full ${step.bg} border-2 border-white shadow-lg flex items-center justify-center z-20 relative transition-transform group-hover:scale-110 cursor-help`}>
                  <step.icon className={step.color} size={24} />
                  
                  {/* Tooltip-like label */}
                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-32 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-[10px] font-bold text-gray-900 uppercase leading-none mb-1">{step.label}</p>
                    <p className="text-[9px] text-gray-500 leading-tight mb-1">{step.desc}</p>
                    {step.email && (
                      <p className="text-[8px] text-indigo-500 font-bold bg-indigo-50 rounded px-1 py-0.5 inline-block">
                        📧 {step.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[10px] font-black text-indigo-600 z-30">
                  {idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={18} />
            Forward Flow
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Shopify Order → Xentral Poll → Invoice/Delivery Note Creation → Zen (Aliko) Fulfillment Trigger.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <RotateCcw className="text-indigo-500" size={18} />
            Feedback Loop
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Zen Shipping Conf → Xentral Tracking Sync → Shopify Confirmation → Klaviyo Final Notification.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Product Creation & Management</h2>
        <p className="text-gray-500">How products are born and managed in the Xentral ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Users className="text-indigo-600" size={20} />
              The SCM Team Role
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              All products are created by the Supply Chain Management (SCM) team. They are responsible for entering master data including:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2"><ChevronRight size={14} /> SKUs (Article Numbers)</li>
              <li className="flex items-center gap-2"><ChevronRight size={14} /> EAN & Tariff Numbers</li>
              <li className="flex items-center gap-2"><ChevronRight size={14} /> Tax Rates & Active Status</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Boxes className="text-indigo-600" size={20} />
              Matrix Products & Bundles
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-gray-700">Matrix Products</h4>
                <p className="text-xs text-gray-500">Used for variations (flavors, sizes). The matrix is an umbrella; variants are the actual synced articles.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700">Bundles</h4>
                <p className="text-xs text-gray-500">Not separate articles. Xentral tracks the individual components comprising the bundle for inventory accuracy.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-4">Synchronization Workflow</h3>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs flex-shrink-0">1</div>
              <p className="text-sm text-indigo-800">SCM Team creates the product in Xentral.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs flex-shrink-0">2</div>
              <p className="text-sm text-indigo-800">Manual "Check Mark" is added to trigger Shopify sync.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs flex-shrink-0">3</div>
              <p className="text-sm text-indigo-800">Shopify Connector (must stay "green") pushes article, stock, and status.</p>
            </li>
          </ol>
          <div className="mt-8 p-4 bg-white rounded-xl border border-indigo-200">
            <p className="text-xs text-indigo-600 italic font-medium">"The search function in Xentral is abysmal—always use exact SKUs when possible."</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Customer & Pricing Sync</h2>
        <p className="text-gray-500">How customer data and pricing hierarchy are managed.</p>
      </div>

      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 mb-6">
        <h3 className="text-orange-900 font-bold mb-2 flex items-center gap-2">
          <Calculator size={18} />
          Pricing Hierarchy: Shopify is Authoritative
        </h3>
        <p className="text-xs text-orange-800 leading-relaxed">
          The price paid by the customer in <strong>Shopify overrides</strong> any price data held in Xentral. Xentral only dictates price for manual B2B orders created directly in the ERP.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-green-50 rounded-2xl">
            <ShoppingCart className="text-green-600" size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Shopify First (B2C & Small B2B)</h3>
            <p className="text-gray-600 leading-relaxed">
              Standard customers are created in Shopify during checkout. Xentral automatically picks up these records along with their order data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
          <div className="space-y-3">
            <h4 className="font-bold text-indigo-600">Influencers & Affiliates</h4>
            <p className="text-sm text-gray-500">
              Tagged in Shopify to receive benefits (free shipping). Their zero-value orders end up in the "B samples" project in Xentral.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-indigo-600">B2B Tiered Strategy</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <h5 className="text-xs font-bold text-gray-700 uppercase mb-1">Small Accounts</h5>
                <p className="text-[11px] text-gray-500 leading-relaxed">Created in <strong>Shopify</strong> → Synced to Xentral. Self-service ordering with tiered discounts.</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <h5 className="text-xs font-bold text-indigo-900 uppercase mb-1">Big Accounts (Key Accounts)</h5>
                <p className="text-[11px] text-indigo-700 leading-relaxed mb-2">Created manually in <strong>Xentral</strong> and <strong>HubSpot</strong> (B2B CRM). High-volume pallet orders handled manually by SCM.</p>
                <div className="pt-2 border-t border-indigo-200 flex items-center gap-2">
                  <span className="text-[9px] font-bold text-indigo-400 uppercase">Contacts:</span>
                  <span className="text-[9px] text-indigo-600 font-medium">SAP Team, Daniela</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-600 p-6 rounded-2xl text-white flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-xl">
          <Database size={24} />
        </div>
        <div>
          <h4 className="font-bold text-sm">CRM Integration</h4>
          <p className="text-xs opacity-80">HubSpot acts as the source of truth for B2B relationship management, while Xentral handles the transactional fulfillment.</p>
        </div>
      </div>
    </div>
  );
}

function ReturnsSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Returns & Credit Notes</h2>
        <p className="text-gray-500">Handling the reverse logistics and financial corrections.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-2">
          <h3 className="font-bold text-lg mb-4">The "Credit Memo" Workflow</h3>
          <p className="text-gray-600 text-sm mb-4">
            In Xentral, refunds and returns are managed via <strong>Credit Memos</strong>. These can be viewed directly within the product view to track historical adjustments.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <div className="flex justify-between text-xs font-medium text-gray-400 uppercase tracking-wider">
              <span>Action</span>
              <span>System</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm font-medium">Customer initiates return</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold">Shopify</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm font-medium">Credit Memo created</span>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold">Xentral</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Stock updated (if applicable)</span>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-[10px] font-bold">Zen (Aliko)</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-900 uppercase mb-2">Internal Verification:</h4>
            <p className="text-[11px] text-indigo-700 leading-relaxed italic">
              "We use the internal Credit Memo view to quickly verify if bundles are correctly exploded in Shopify reports—ensuring inventory accuracy across systems."
            </p>
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col justify-center text-center">
          <RotateCcw className="text-red-500 mx-auto mb-4" size={40} />
          <h3 className="font-bold text-red-900 mb-2">Critical Check</h3>
          <p className="text-xs text-red-700">
            Always verify if bundles are correctly exploded in credit memos to ensure Shopify reports match Xentral inventory.
          </p>
        </div>
      </div>
    </div>
  );
}

function AccountingSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Accounting in Xentral</h2>
        <p className="text-gray-500">Xentral serves as the single source of truth for financial data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Calculator className="text-indigo-600" size={24} />
            Data Source
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Accounting relies entirely on Xentral for all transaction data. This includes invoices, credit memos, and payment status updates.
          </p>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Payment Connections</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Shopify Payments</span>
                <span className="text-green-600 font-medium">Grouped</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>PayPal</span>
                <span className="text-blue-600 font-medium">Separate Connection</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 space-y-6">
          <h3 className="text-xl font-bold text-orange-900">The Gift Card Challenge</h3>
          <p className="text-orange-800 text-sm leading-relaxed">
            Gift cards are treated as a <strong>payment type</strong> in Xentral. This can cause significant issues for accounting reconciliation because:
          </p>
          <ul className="space-y-3 text-sm text-orange-700">
            <li className="flex items-start gap-2">
              <X size={16} className="mt-0.5 flex-shrink-0" />
              They represent a liability, not immediate revenue.
            </li>
            <li className="flex items-start gap-2">
              <X size={16} className="mt-0.5 flex-shrink-0" />
              Double-counting risks if not handled correctly during redemption.
            </li>
          </ul>
        </div>

        <div className="bg-red-50 p-8 rounded-3xl border border-red-100 space-y-6 md:col-span-2">
          <h3 className="text-xl font-bold text-red-900 flex items-center gap-2">
            <CheckCircle2 size={24} />
            Tax Parity: The "No Override" Rule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-red-800 text-sm">Xentral Responsibility</h4>
              <p className="text-xs text-red-700 leading-relaxed">Generates the legal invoice. If tax is wrong here, the <strong>invoice is legally incorrect</strong> and must be cancelled/reissued.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-red-800 text-sm">Shopify Responsibility</h4>
              <p className="text-xs text-red-700 leading-relaxed">Calculates the VAT at checkout. If tax is wrong here, the <strong>VAT collection is incorrect</strong>, leading to tax liability gaps.</p>
            </div>
          </div>
          <div className="p-4 bg-white/50 rounded-xl border border-red-200">
            <p className="text-xs text-red-900 font-black uppercase tracking-widest text-center">
              Critical: Nothing overrides anything. Parity is mandatory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RefundsSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">How Refunds are Made</h2>
        <p className="text-gray-500">The technical steps for processing financial returns.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <CreditCard size={120} />
        </div>
        
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">1. Initiation in Shopify</h3>
            <p className="text-gray-600 text-sm">The refund is typically triggered in Shopify to ensure the customer receives their money via the original payment gateway.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">2. Sync to Xentral</h3>
            <p className="text-gray-600 text-sm">The Shopify Connector picks up the refund event and creates a corresponding <strong>Credit Memo</strong> in Xentral.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">3. Inventory Adjustment</h3>
            <p className="text-gray-600 text-sm">If the item is returned to stock, Zen (Aliko) updates the inventory, which syncs back to Xentral overnight, and then pushes to Shopify.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MaterialsSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Stock & Inventory Logic</h2>
        <p className="text-gray-500">Managing stock levels, safety buffers, and manual overrides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold">Stock Synchronization</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Truck className="text-indigo-600" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold">Zen (Aliko) → Xentral</h4>
                <p className="text-xs text-gray-500">Overnight API sync. Overwrites Xentral numbers.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <RotateCcw className="text-indigo-600" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold">Manual Sync Override</h4>
                <p className="text-xs text-indigo-700">If overnight sync is missed, stock can be manually added in Xentral to enable immediate Shopify sales.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ShoppingCart className="text-green-600" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold">Xentral → Shopify</h4>
                <p className="text-xs text-gray-500">Constant push (~every 15 mins) to keep storefront updated.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
          <h3 className="text-xl font-bold">The 30-Unit Safety Buffer</h3>
          <p className="opacity-90 text-sm leading-relaxed">
            To prevent overselling, a total buffer of 30 units is maintained across the chain:
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <div>
                <p className="font-medium">Zen (Aliko) Internal Buffer</p>
                <p className="text-[10px] opacity-60">Not reported to Xentral</p>
              </div>
              <span className="font-bold">10 Units</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <div>
                <p className="font-medium">Shopify Settings Buffer</p>
                <p className="text-[10px] opacity-60">Set in Shopify backend</p>
              </div>
              <span className="font-bold">20 Units</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold">Total Safety Margin</span>
              <span className="text-2xl font-black">30 Units</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SamplesSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Samples & Influencer Orders</h2>
        <p className="text-gray-500">Managing non-revenue orders and promotional fulfillment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle2 className="text-indigo-600" size={24} />
            The "BA Samples" Project
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Used primarily by the Influencer team for sending free items to partners.
          </p>
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-900 uppercase mb-2">Key Rules:</h4>
            <ul className="space-y-2 text-xs text-indigo-800">
              <li className="flex items-center gap-2">• Zero Revenue (0.00 €)</li>
              <li className="flex items-center gap-2">• Manual creation in Xentral</li>
              <li className="flex items-center gap-2">• Direct fulfillment via Zen (Aliko)</li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
          <h3 className="text-xl font-bold">Influencer Self-Ordering</h3>
          <p className="opacity-90 text-sm leading-relaxed">
            Affiliates and influencers can order themselves via Shopify using <strong>Gift Cards</strong>.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Users size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Shopify Tagging</h4>
                <p className="text-xs opacity-70">Customers are tagged to receive benefits like free shipping automatically.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Package size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">"B Samples" Project</h4>
                <p className="text-xs opacity-70">These zero-value Shopify orders are mapped to the "B samples" project in Xentral for tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReturnsFlowSection() {
  const steps = [
    { label: "Return Trigger", icon: RotateCcw, desc: "Customer or DHL failure", color: "text-red-600", bg: "bg-red-50" },
    { label: "Zen (Aliko)", icon: Truck, desc: "Product arrives at warehouse", color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Customer Email", icon: Mail, desc: "Refund or Re-shipment?", color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Returns & Refunds Flow</h2>
        <p className="text-gray-500">Visualizing the decision tree for reverse logistics.</p>
      </div>

      <div className="relative flex flex-col items-center gap-8 py-10">
        {/* Top Part */}
        <div className="flex items-center gap-12">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-12">
              <div className="flex flex-col items-center text-center w-32">
                <div className={`w-16 h-16 rounded-full ${step.bg} flex items-center justify-center shadow-lg mb-3`}>
                  <step.icon className={step.color} size={24} />
                </div>
                <p className="text-xs font-bold uppercase tracking-tight">{step.label}</p>
                <p className="text-[10px] text-gray-500">{step.desc}</p>
              </div>
              {i < steps.length - 1 && <ArrowRight className="text-gray-300" size={24} />}
            </div>
          ))}
        </div>

        {/* Decision Split */}
        <div className="w-full max-w-3xl flex justify-between gap-8 pt-8 border-t border-gray-100 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 border border-gray-100 rounded-full text-[10px] font-black text-indigo-600 uppercase">Decision</div>
          
          {/* Path A: Refund */}
          <div className="flex-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-red-600 uppercase flex items-center gap-2">
              <CreditCard size={16} />
              Path A: Refund
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-xl text-[11px] border border-gray-100">
                <span className="font-bold text-gray-700">1. Xentral:</span> CS creates Return & Credit Memo
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl text-[11px] border border-indigo-100">
                <span className="font-bold text-indigo-700">2. Automation:</span> Planned sync triggers Shopify Payout
              </div>
              <div className="p-3 bg-gray-50 rounded-xl text-[11px] border border-gray-100">
                <span className="font-bold text-gray-700">3. Current:</span> Manual trigger in Shopify backend
              </div>
            </div>
          </div>

          {/* Path B: Re-shipment */}
          <div className="flex-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-green-600 uppercase flex items-center gap-2">
              <Truck size={16} />
              Path B: Re-shipment
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-xl text-[11px] border border-gray-100">
                <span className="font-bold text-gray-700">1. Xentral:</span> CS tracks return & creates New Shipment
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl text-[11px] border border-indigo-100">
                <span className="font-bold text-indigo-700">2. Logic:</span> First 2 re-shipments are free of charge
              </div>
              <div className="p-3 bg-gray-50 rounded-xl text-[11px] border border-gray-100">
                <span className="font-bold text-gray-700">3. Cycle:</span> Restarts standard Flow (DN → Zen → Ship)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelsSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Amazon & Shopware Challenges</h2>
        <p className="text-gray-500">Understanding non-Shopify channel integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="text-orange-600" size={24} />
            Amazon Integration
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <h4 className="text-xs font-bold text-orange-900 uppercase mb-1">FBM (Fulfilled by Merchant)</h4>
              <p className="text-[11px] text-orange-800 leading-relaxed">Orders flow via <strong>Billbee</strong> directly to Zen (Aliko). Used for glass bottles (MCT Oil).</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="text-xs font-bold text-gray-700 uppercase mb-1">FBA (Fulfilled by Amazon)</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">Not reflected in Xentral. Data is extracted manually from Amazon Merchant Portal for reporting.</p>
            </div>
          </div>
          <p className="text-xs text-red-500 font-bold italic">"Amazon connection remains a major technical hurdle—no stable direct sync currently."</p>
        </div>

        <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Database size={24} />
            Shopware Edge Case
          </h3>
          <p className="opacity-90 text-sm leading-relaxed">
            Shopware functions similarly to Shopify but with a critical encryption issue.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Mail size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Encrypted Emails</h4>
                <p className="text-xs opacity-70">Xentral cannot send invoices directly to Shopware customers due to email encryption.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <RotateCcw size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Manual Weekly Sync</h4>
                <p className="text-xs opacity-70">Invoices must be manually marked as shipped once per week to sync with the customer's Shopware account.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlossarySection() {
  const [search, setSearch] = useState("");
  
  const filteredGlossary = GLOSSARY.filter(term => 
    term.en.toLowerCase().includes(search.toLowerCase()) || 
    term.de.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">E-commerce Glossary</h2>
        <p className="text-gray-500">50 essential terms in English and German.</p>
      </div>

      <div className="sticky top-0 z-10 bg-[#F8F9FA] pb-4">
        <input 
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGlossary.map((term, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-indigo-600">{term.en}</h4>
              <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 rounded text-gray-400 uppercase">DE: {term.de}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{term.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionsSection() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Questions & Next Steps</h2>
        <p className="text-gray-500">Refining the integration with the Lead Developer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-indigo-600">Technical & Functional Questions</h3>
          <ul className="space-y-4">
            {[
              "Multi-Channel: How does Xentral handle stock across multiple Shopify stores or Amazon?",
              "Batch/MHD: Do we need to track specific batches or Best Before Dates for our products?",
              "Automation: Which manual steps can we automate via 'Process Starter' (e.g. auto-invoice)?",
              "Custom Fields: Do we need custom attributes in Xentral that aren't in Shopify?",
              "API Limits: What are the rate limits for the Xentral/Shopify sync?",
              "User Roles: Who has access to what? (SCM vs. Accounting vs. Customer Service)",
              "Tax Parity: How do we audit Xentral and Shopify to ensure 100% tax parity?",
              "Search Optimization: Can we improve the 'abysmal' search results via API queries?",
              "Discount Logic: How does the new 'Custom Discount App' sync price reductions to Xentral positions?",
              "Market Routing: How do we handle the move of Luxembourg traffic to the German (D) market in Xentral?"
            ].map((q, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600">
                <HelpCircle size={18} className="text-indigo-400 flex-shrink-0" />
                {q}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-4">Immediate Next Steps</h3>
            <ul className="space-y-3 text-sm text-indigo-800">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Align on B2B companies tag (January)</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Connect with Lisa regarding Shopify business accounts</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Review Aliko API documentation for live sync options</li>
            </ul>
          </div>
          
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4">Support Resources</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <p><strong>Primary Owner:</strong> Lisa</p>
              <p><strong>Account Manager:</strong> Holga</p>
              <p><strong>Support:</strong> Create tickets for complex issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
