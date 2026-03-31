
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
    { id: "channels", label: "Amazon & ShopApoteke", icon: ShoppingCart },
    { id: "accounting", label: "Accounting", icon: Calculator },
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
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting
          </span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Matrix Products & Shopify Variants</h2>
        <p className="text-gray-500">Understanding the structure and sync process for complex product variations.</p>
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

      {/* NEW: Step-by-Step Creation Process */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Package className="text-indigo-600" size={24} />
          Creating a Matrix Product for Shopify (Step-by-Step)
        </h3>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">1</div>
            <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-indigo-900 mb-2">Create Matrix in Webshop Section</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Navigate to the <strong>Webshop</strong> section in Xentral and create a new Matrix Product. This acts as the "umbrella" container.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">2</div>
            <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-indigo-900 mb-2">Add Options (Variants)</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Add options like <strong>Flavor</strong>, <strong>Size</strong>, or <strong>Color</strong>. Each option creates variant possibilities.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">3</div>
            <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-indigo-900 mb-2">Search & Link SCM Products</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Search for the individual products (already created by the <strong>SCM Team</strong>) and link them as variants under the Matrix.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-800">
                  <strong>Note:</strong> The SCM team must have already created the individual SKUs with all master data (EAN, tariff number, etc.) before you can link them.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">4</div>
            <div className="flex-1 p-4 bg-green-50 rounded-2xl border border-green-100">
              <h4 className="font-bold text-green-900 mb-2">Tick the Shopify Integration Box ✓</h4>
              <p className="text-sm text-green-800 leading-relaxed">
                For each variant product, you must <strong>manually check the "Sync to Shopify" checkbox</strong>. This marks the product as ready for Shopify integration.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">5</div>
            <div className="flex-1 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2">Trigger Shopify Connector Search</h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Go to the <strong>Shopify Connector</strong> and manually tell it to search for products with the integration box ticked. This initiates the sync process.
              </p>
            </div>
          </div>

          {/* Step 6 - With Warning */}
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">6</div>
            <div className="flex-1 p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-amber-900 mb-2">Push Product to Shopify</h4>
              <p className="text-sm text-amber-800 leading-relaxed mb-3">
                <strong>Theoretically</strong>, you can now push the product and it will be created in Shopify with all its variants.
              </p>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                <p className="text-xs text-red-800 font-bold flex items-center gap-2">
                  <X size={14} />
                  Currently Not Working: Product push is broken. Manual creation in Shopify may be required as a workaround.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Sync Alternative */}
      <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
        <h4 className="text-green-900 font-bold mb-3 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-green-600" />
          Alternative: Stock Sync Works (Bestandsynchronisierung)
        </h4>
        <p className="text-sm text-green-800 leading-relaxed mb-4">
          Even though product creation push is currently broken, you <strong>can still push stock levels</strong> (Bestandsynchronisierung). This means:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/50 rounded-xl border border-green-200">
            <h5 className="text-xs font-bold text-green-900 uppercase mb-2">What Works:</h5>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Stock level updates to Shopify ✓</li>
              <li>• Inventory sync (~15 min intervals) ✓</li>
              <li>• Out-of-stock status updates ✓</li>
            </ul>
          </div>
          <div className="p-4 bg-white/50 rounded-xl border border-green-200">
            <h5 className="text-xs font-bold text-green-900 uppercase mb-2">Current Workaround:</h5>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Create product manually in Shopify</li>
              <li>• Link SKUs between systems</li>
              <li>• Use stock sync to keep inventory updated</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Visual Summary */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-center">Matrix Product Flow Summary</h3>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="text-center p-3">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-2">
              <Users className="text-gray-600" size={24} />
            </div>
            <p className="text-[10px] font-bold">SCM Team</p>
            <p className="text-[8px] text-gray-400">Creates SKUs</p>
          </div>
          
          <ArrowRight className="text-gray-300" size={20} />

          <div className="text-center p-3">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-2">
              <Boxes className="text-indigo-600" size={24} />
            </div>
            <p className="text-[10px] font-bold">Matrix Created</p>
            <p className="text-[8px] text-gray-400">Webshop section</p>
          </div>
          
          <ArrowRight className="text-gray-300" size={20} />

          <div className="text-center p-3">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <p className="text-[10px] font-bold">Tick Shopify Box</p>
            <p className="text-[8px] text-gray-400">Per variant</p>
          </div>
          
          <ArrowRight className="text-gray-300" size={20} />

          <div className="text-center p-3">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-2">
              <Database className="text-indigo-600" size={24} />
            </div>
            <p className="text-[10px] font-bold">Connector Search</p>
            <p className="text-[8px] text-gray-400">Manual trigger</p>
          </div>
          
          <ArrowRight className="text-gray-300" size={20} />

          <div className="text-center p-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-2">
              <ShoppingCart className="text-amber-600" size={24} />
            </div>
            <p className="text-[10px] font-bold">Shopify</p>
            <p className="text-[8px] text-red-500 font-bold">Product: ✗ | Stock: ✓</p>
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
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting Notes
          </span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Xentral ERP <span className="text-indigo-600">Integration</span> & Workflows
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          A comprehensive guide for the Lead Developer to understand the synchronization between Shopify, Xentral, and Zen (Aliko).
        </p>
      </div>

      {/* System Overview */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-100">
        <h3 className="font-bold text-lg mb-6 text-indigo-900">The Three Pillars</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="text-green-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-900">Shopify</h4>
            <p className="text-xs text-gray-500 mt-1">Storefront & Customer-Facing</p>
            <p className="text-[10px] text-gray-400 mt-2">Orders, Prices, Customer Data</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-3">
              <Database className="text-indigo-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-900">Xentral</h4>
            <p className="text-xs text-gray-500 mt-1">ERP & Source of Truth</p>
            <p className="text-[10px] text-gray-400 mt-2">Products, Invoices, Accounting</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <Truck className="text-orange-600" size={28} />
            </div>
            <h4 className="font-bold text-gray-900">Zen (Aliko)</h4>
            <p className="text-xs text-gray-500 mt-1">Warehouse & Fulfillment</p>
            <p className="text-[10px] text-gray-400 mt-2">Stock, Shipping, Returns</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={20} />
            What This Guide Covers
          </h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
              <span>End-to-end order & fulfillment flow</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
              <span>Product creation (Simple, Matrix, Bundles)</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
              <span>Customer sync limitations & B2B strategy</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
              <span>Returns, refunds & credit memo workflow</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
              <span>Stock sync timing & 30-unit safety buffer</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
              <span>Influencer samples & gift card accounting</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
              <span>Amazon FBM/FBA & ShopApoteke edge cases</span>
            </li>
          </ul>
        </div>

        <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-lg shadow-indigo-200">
          <h3 className="text-lg font-bold mb-4">Presentation Goal</h3>
          <p className="opacity-90 leading-relaxed text-sm mb-6">
            Bridge the gap between business operations (Junior Ecommerce Manager) and technical implementation (Lead Developer) to ensure a robust, scalable ERP setup.
          </p>
          <div className="p-4 bg-white/10 rounded-xl">
            <h4 className="text-xs font-bold uppercase mb-2 opacity-80">Key Stakeholders:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold">SCM Team</span>
              <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold">Accounting</span>
              <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold">Customer Service</span>
              <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold">Influencer Team</span>
              <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold">Development</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Rules */}
      <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
        <h4 className="text-red-900 font-bold mb-3 flex items-center gap-2">
          <X size={18} className="text-red-500" />
          Critical Rules to Remember
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-white/50 rounded-xl border border-red-200">
            <p className="text-xs text-red-800">
              <strong>Tax Parity:</strong> Tax rates must be identical in Xentral and Shopify. Nothing overrides the other.
            </p>
          </div>
          <div className="p-3 bg-white/50 rounded-xl border border-red-200">
            <p className="text-xs text-red-800">
              <strong>Customer Updates:</strong> Shopify customer data does NOT sync back to Xentral after initial creation.
            </p>
          </div>
          <div className="p-3 bg-white/50 rounded-xl border border-red-200">
            <p className="text-xs text-red-800">
              <strong>Price Authority:</strong> Shopify price always wins. Xentral only dictates pricing for manual B2B orders.
            </p>
          </div>
          <div className="p-3 bg-white/50 rounded-xl border border-red-200">
            <p className="text-xs text-red-800">
              <strong>Stock Source:</strong> Zen (Aliko) overwrites Xentral nightly. Manual updates are temporary.
            </p>
          </div>
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
    { label: "Zen (Aliko)", icon: Package, desc: "Shipped", color: "text-orange-600", bg: "bg-orange-50", email: "Tracking (via DHL)" },
    { label: "Xentral", icon: CheckCircle2, desc: "Tracking Sync", color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Shopify", icon: Mail, desc: "Ship Confirm", color: "text-green-600", bg: "bg-green-50", email: "Shipping Confirmation" },
  ];

  const radius = 220;
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting
          </span>
        </div>
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

      {/* Email Summary */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Mail className="text-indigo-600" size={20} />
          Customer Email Touchpoints
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart size={14} className="text-green-600" />
              <span className="text-[10px] font-bold text-green-800 uppercase">Shopify</span>
            </div>
            <p className="text-xs font-bold text-green-900">Order Confirmation</p>
            <p className="text-[10px] text-green-700">Immediate after checkout</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <Database size={14} className="text-indigo-600" />
              <span className="text-[10px] font-bold text-indigo-800 uppercase">Xentral</span>
            </div>
            <p className="text-xs font-bold text-indigo-900">Invoice PDF</p>
            <p className="text-[10px] text-indigo-700">With delivery note creation</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <Truck size={14} className="text-orange-600" />
              <span className="text-[10px] font-bold text-orange-800 uppercase">DHL (via Zen)</span>
            </div>
            <p className="text-xs font-bold text-orange-900">Tracking Number</p>
            <p className="text-[10px] text-orange-700">When package is shipped</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart size={14} className="text-green-600" />
              <span className="text-[10px] font-bold text-green-800 uppercase">Shopify</span>
            </div>
            <p className="text-xs font-bold text-green-900">Shipping Confirmation</p>
            <p className="text-[10px] text-green-700">Final customer notification</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={18} />
            Forward Flow
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Shopify Order → Xentral Poll → Invoice/Delivery Note Creation → Zen (Aliko) Fulfillment → Shipping Confirmation back to Shopify.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <RotateCcw className="text-indigo-500" size={18} />
            Feedback Loop
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Zen Shipping Conf → Xentral Tracking Sync → Shopify receives tracking → Shopify sends final shipping confirmation email.
          </p>
        </div>
      </div>

      {/* Klaviyo Clarification */}
      <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
        <h4 className="text-pink-900 font-bold mb-3 flex items-center gap-2">
          <Mail size={18} className="text-pink-500" />
          Klaviyo: Marketing Only (Not Part of Core Flow)
        </h4>
        <p className="text-sm text-pink-800 leading-relaxed mb-4">
          Klaviyo is <strong>not part of the standard order fulfillment flow</strong>. It is triggered separately based on marketing needs:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white/50 rounded-xl border border-pink-200">
            <p className="text-xs font-bold text-pink-900">Product-Specific Campaigns</p>
            <p className="text-[10px] text-pink-700">E.g., Sleep products get additional tips</p>
          </div>
          <div className="p-3 bg-white/50 rounded-xl border border-pink-200">
            <p className="text-xs font-bold text-pink-900">E-book Delivery</p>
            <p className="text-[10px] text-pink-700">Digital content attached to certain SKUs</p>
          </div>
          <div className="p-3 bg-white/50 rounded-xl border border-pink-200">
            <p className="text-xs font-bold text-pink-900">Post-Purchase Flows</p>
            <p className="text-[10px] text-pink-700">Review requests, cross-sell, loyalty</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting
          </span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Product Creation & Shopify Sync</h2>
        <p className="text-gray-500">How products are created in Xentral and synchronized to Shopify.</p>
      </div>

      {/* Key Concept */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
        <h4 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
          <Database size={18} />
          Xentral is the Source of Truth
        </h4>
        <p className="text-sm text-amber-800">
          Products are <strong>always created in Xentral first</strong>, then synced to Shopify. 
          Never create products directly in Shopify—this ensures master data consistency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Creation Process */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Users className="text-indigo-600" size={20} />
              Who Creates Products?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              The <strong>SCM Team</strong> (Supply Chain Management) is responsible for all product creation in Xentral.
            </p>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Required Master Data:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500" /> <strong>SKU</strong> (Article Number)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500" /> <strong>EAN</strong> (Barcode)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500" /> <strong>Tariff Number</strong> (for international shipping)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500" /> <strong>Tax Rate</strong> (must match Shopify exactly!)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500" /> <strong>Active Status</strong></li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-indigo-500" /> <strong>Price</strong> (base price for B2B)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Boxes className="text-indigo-600" size={20} />
              Product Types
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h4 className="text-sm font-bold text-indigo-900">Simple Products</h4>
                <p className="text-xs text-indigo-700 mt-1">Single SKU items without variations.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <h4 className="text-sm font-bold text-purple-900">Matrix Products</h4>
                <p className="text-xs text-purple-700 mt-1">Parent product with variations (flavors, sizes). The "umbrella" article.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <h4 className="text-sm font-bold text-green-900">Bundles</h4>
                <p className="text-xs text-green-700 mt-1">Not separate articles—Xentral tracks the individual components for inventory.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sync Process */}
        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-6 flex items-center gap-2">
            <ShoppingCart size={20} />
            Shopify Synchronization Steps
          </h3>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-bold text-indigo-900">Create Product in Xentral</p>
                <p className="text-xs text-indigo-700 mt-1">SCM team enters all master data fields.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-bold text-indigo-900">Add "Sync to Shopify" Checkmark</p>
                <p className="text-xs text-indigo-700 mt-1">Manual checkbox to trigger the connector.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <p className="font-bold text-indigo-900">Shopify Connector Activates</p>
                <p className="text-xs text-indigo-700 mt-1">Must be "green" (connected). Pushes article data.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div>
                <p className="font-bold text-indigo-900">Stock Levels Sync</p>
                <p className="text-xs text-indigo-700 mt-1">Inventory pushes automatically (~15 min intervals).</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">✓</div>
              <div>
                <p className="font-bold text-green-900">Product Live in Shopify</p>
                <p className="text-xs text-green-700 mt-1">Available for customers to purchase.</p>
              </div>
            </li>
          </ol>

          <div className="mt-8 p-4 bg-white rounded-xl border border-indigo-200">
            <h4 className="text-xs font-bold text-indigo-900 uppercase mb-2">What Syncs to Shopify:</h4>
            <div className="flex flex-wrap gap-2">
              {["Title", "Description", "SKU", "Price", "Stock Level", "Images", "Variants", "Status"].map((item, i) => (
                <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sync Direction Diagram */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-center">Sync Direction & Frequency</h3>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center p-4">
            <div className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-2">
              <Database className="text-indigo-600" size={32} />
            </div>
            <p className="font-bold text-sm">Xentral</p>
            <p className="text-[10px] text-gray-400">Source of Truth</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <ArrowRight className="text-indigo-500" size={24} />
              <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded">~15 min</span>
            </div>
            <p className="text-[10px] text-gray-400">Product & Stock Push</p>
          </div>

          <div className="text-center p-4">
            <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-2">
              <ShoppingCart className="text-green-600" size={32} />
            </div>
            <p className="font-bold text-sm">Shopify</p>
            <p className="text-[10px] text-gray-400">Storefront</p>
          </div>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
        <h4 className="text-red-900 font-bold mb-2 flex items-center gap-2">
          <X size={18} className="text-red-500" />
          Critical: Tax Rate Parity
        </h4>
        <p className="text-sm text-red-800">
          Tax rates in Xentral <strong>must match exactly</strong> with Shopify. There is no override—if they don't match, 
          invoices will be legally incorrect or VAT collection will be wrong. Always verify both systems when creating products.
        </p>
      </div>

      {/* Tip Box */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h4 className="text-gray-700 font-bold mb-2 flex items-center gap-2">
          <HelpCircle size={18} className="text-gray-500" />
          Pro Tip from Mareen
        </h4>
        <p className="text-sm text-gray-600 italic">
          "The search function in Xentral is abysmal—always use exact SKUs when looking up products. 
          Partial searches often return incorrect or incomplete results."
        </p>
      </div>
    </div>
  );
}

function CustomerSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting
          </span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Customer & Pricing Sync</h2>
        <p className="text-gray-500">How customer data and pricing hierarchy are managed between systems.</p>
      </div>

      {/* Critical Warning */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
        <h3 className="text-amber-900 font-bold mb-3 flex items-center gap-2">
          <ShoppingCart size={18} />
          Shopify is Authoritative for Pricing
        </h3>
        <p className="text-sm text-amber-800 leading-relaxed">
          The price paid by the customer in <strong>Shopify always wins</strong>. Xentral accepts whatever price comes from Shopify—it does not override or validate. 
          Xentral only dictates pricing for <strong>manual B2B orders</strong> created directly in the ERP.
        </p>
      </div>

      {/* Customer Data Sync Limitation */}
      <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
        <h3 className="text-red-900 font-bold mb-3 flex items-center gap-2">
          <X size={18} className="text-red-500" />
          Customer Data is NOT Updated in Xentral
        </h3>
        <p className="text-sm text-red-800 leading-relaxed mb-4">
          Once a customer record is created in Xentral, <strong>it is not automatically updated</strong> from Shopify. 
          If a customer updates their address or details in Shopify, those changes may not sync to Xentral.
        </p>
        <div className="p-4 bg-white/50 rounded-xl border border-red-200">
          <h4 className="text-xs font-bold text-red-900 uppercase mb-2">Field Mismatch Warning:</h4>
          <p className="text-xs text-red-700">
            If a field is updated in Shopify but <strong>doesn't exist in Xentral</strong>, the update is irrelevant and won't be reflected. 
            Always verify critical customer data exists in both systems.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Creation Flow */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-green-50 rounded-2xl">
              <ShoppingCart className="text-green-600" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Shopify First (B2C & Small B2B)</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Standard customers are created in Shopify during checkout. Xentral automatically picks up these records along with their order data.
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">What Syncs at Order Creation:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Customer name & email</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Shipping address</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Billing address</li>
              <li className="flex items-center gap-2"><X size={14} className="text-red-400" /> <span className="text-gray-400">Subsequent updates (NOT synced)</span></li>
            </ul>
          </div>
        </div>

        {/* B2B Strategy */}
        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-3">Influencers & Affiliates</h4>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Tagged in Shopify to receive benefits (free shipping). Their zero-value orders end up in the <strong>"B samples" project</strong> in Xentral.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-indigo-600 mb-4">B2B Tiered Strategy</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h5 className="text-xs font-bold text-gray-700 uppercase mb-1">Small B2B Accounts</h5>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Created in <strong>Shopify</strong> → Synced to Xentral. Self-service ordering with tiered discounts.
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h5 className="text-xs font-bold text-indigo-900 uppercase mb-1">Big Accounts (Key Accounts)</h5>
                <p className="text-[11px] text-indigo-700 leading-relaxed mb-2">
                  Created manually in <strong>Xentral</strong> and <strong>HubSpot</strong> (B2B CRM). High-volume pallet orders handled manually by SCM.
                </p>
                <div className="pt-2 border-t border-indigo-200 flex items-center gap-2">
                  <span className="text-[9px] font-bold text-indigo-400 uppercase">Contacts:</span>
                  <span className="text-[9px] text-indigo-600 font-medium">SAP Team, Daniela</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sync Direction Summary */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-center">Customer Data Flow Summary</h3>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center p-4">
            <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-2">
              <ShoppingCart className="text-green-600" size={32} />
            </div>
            <p className="font-bold text-sm">Shopify</p>
            <p className="text-[10px] text-gray-400">Customer Master</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <ArrowRight className="text-green-500" size={24} />
            </div>
            <p className="text-[10px] text-green-600 font-bold">Initial Sync Only</p>
            <p className="text-[9px] text-gray-400">(No updates after creation)</p>
          </div>

          <div className="text-center p-4">
            <div className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-2">
              <Database className="text-indigo-600" size={32} />
            </div>
            <p className="font-bold text-sm">Xentral</p>
            <p className="text-[10px] text-gray-400">Order Processing</p>
          </div>
        </div>
      </div>

      {/* CRM Note */}
      <div className="bg-indigo-600 p-6 rounded-2xl text-white flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-xl">
          <Database size={24} />
        </div>
        <div>
          <h4 className="font-bold text-sm">CRM Integration (B2B Only)</h4>
          <p className="text-xs opacity-80">
            HubSpot acts as the source of truth for B2B relationship management, while Xentral handles transactional fulfillment. 
            Key account data lives in HubSpot, not Shopify.
          </p>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h4 className="text-gray-700 font-bold mb-2 flex items-center gap-2">
          <HelpCircle size={18} className="text-gray-500" />
          Implication for Customer Service
        </h4>
        <p className="text-sm text-gray-600">
          If a customer updates their shipping address in Shopify after their first order, the <strong>old address may still appear in Xentral</strong> 
          for subsequent orders unless manually corrected. Always verify addresses for repeat customers.
        </p>
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
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting
          </span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Accounting in Xentral</h2>
        <p className="text-gray-500">Xentral serves as the single source of truth for financial data, invoicing, and credit memos.</p>
      </div>

      {/* Key Concept */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
        <h4 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
          <Calculator size={18} />
          Xentral = Pre-Accounting System
        </h4>
        <p className="text-sm text-amber-800">
          Xentral handles <strong>pre-accounting</strong> (Vorbuchhaltung). All invoices, credit memos, and payment data are prepared here 
          before being exported to the tax advisor or final accounting system (e.g., DATEV).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Data Sources */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Database className="text-indigo-600" size={24} />
            Data Sources & Payment Connections
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            Accounting relies entirely on Xentral for all transaction data. Multiple payment providers feed into the system.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-green-900">Shopify Payments</h4>
                <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-1 rounded">GROUPED</span>
              </div>
              <p className="text-xs text-green-700">All Shopify payment methods (cards, Apple Pay, etc.) are grouped together in reporting.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-blue-900">PayPal</h4>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">SEPARATE</span>
              </div>
              <p className="text-xs text-blue-700">PayPal has its own connection and reconciliation process.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-purple-900">Klarna / BNPL</h4>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">SEPARATE</span>
              </div>
              <p className="text-xs text-purple-700">Buy Now Pay Later providers tracked separately for reconciliation.</p>
            </div>
          </div>
        </div>

        {/* Gift Card Challenge */}
        <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 space-y-6">
          <h3 className="text-xl font-bold text-orange-900 flex items-center gap-2">
            <CreditCard size={24} />
            The Gift Card Challenge
          </h3>
          <p className="text-orange-800 text-sm leading-relaxed">
            Gift cards are treated as a <strong>payment type</strong> in Xentral, not as revenue. This creates accounting complexity:
          </p>
          <ul className="space-y-3 text-sm text-orange-700">
            <li className="flex items-start gap-2">
              <X size={16} className="mt-0.5 flex-shrink-0 text-red-500" />
              <span>They represent a <strong>liability</strong>, not immediate revenue</span>
            </li>
            <li className="flex items-start gap-2">
              <X size={16} className="mt-0.5 flex-shrink-0 text-red-500" />
              <span>Double-counting risks if not handled correctly during redemption</span>
            </li>
            <li className="flex items-start gap-2">
              <X size={16} className="mt-0.5 flex-shrink-0 text-red-500" />
              <span>Influencer gift cards = zero cash revenue orders</span>
            </li>
          </ul>
          <div className="p-4 bg-white/50 rounded-xl border border-orange-200">
            <h4 className="text-xs font-bold text-orange-900 uppercase mb-2">Accounting Treatment:</h4>
            <p className="text-xs text-orange-700">
              Gift card issuance is tracked as a <strong>prepaid liability</strong>. Revenue is only recognized when the gift card is redeemed against actual products.
            </p>
          </div>
        </div>
      </div>

      {/* Influencer & Sample Order Accounting */}
      <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Users size={28} />
          Influencer & Sample Order Accounting
        </h3>
        <p className="opacity-90 text-sm leading-relaxed">
          Sample orders require special accounting treatment since they generate <strong>zero revenue</strong> but incur real costs (COGS, shipping).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BE Samples (Internal) */}
          <div className="p-6 bg-white/10 rounded-2xl">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Database size={18} />
              BE Samples (Internal - Manual)
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                <span>Order value: <strong>0.00 €</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                <span>Created manually in Xentral</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                <span>Tracked under "BE Samples" project</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                <span>Invoice generated but shows 0.00 €</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/10 rounded-xl">
              <p className="text-[10px] opacity-80">
                <strong>Accounting:</strong> COGS is still recorded. Marketing expense category.
              </p>
            </div>
          </div>

          {/* BE Samples (Self-Service) */}
          <div className="p-6 bg-white/10 rounded-2xl">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <ShoppingCart size={18} />
              BE Samples (Self-Service via Gift Card)
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                <span>Payment: Gift Card (pre-loaded budget)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                <span>Order flows through Shopify → Xentral</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                <span>Tracked under "BE Samples" project</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                <span>Invoice shows gift card as payment method</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/10 rounded-xl">
              <p className="text-[10px] opacity-80">
                <strong>Accounting:</strong> Gift card liability is reduced. No new cash revenue.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-500/20 rounded-xl border border-amber-400/30">
          <p className="text-sm text-amber-200">
            <strong>Key Insight:</strong> Both sample types must be filtered out when calculating actual sales revenue. 
            Use the <strong>Project filter</strong> in Xentral to separate "BE Samples" from regular orders.
          </p>
        </div>
      </div>

      {/* Credit Memos / Gutschriften */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <RotateCcw className="text-red-500" size={24} />
          Credit Memos (Gutschriften)
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Credit memos are the accounting document for all refunds and returns. They link back to the original invoice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <h4 className="text-sm font-bold text-red-900 mb-2">Full Refund</h4>
            <p className="text-xs text-red-700">
              Credit memo equals original invoice amount. Completely reverses the sale.
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <h4 className="text-sm font-bold text-amber-900 mb-2">Partial Refund</h4>
            <p className="text-xs text-amber-700">
              Credit memo for specific line items or partial amounts. Common for bundles.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="text-sm font-bold text-blue-900 mb-2">Shipping Refund</h4>
            <p className="text-xs text-blue-700">
              Credit memo for shipping costs only. Product sale remains intact.
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Credit Memo Workflow:</h4>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="text-center p-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-1">
                <RotateCcw size={16} className="text-red-600" />
              </div>
              <p className="text-[9px] font-bold">Return/Refund</p>
            </div>
            <ArrowRight size={14} className="text-gray-300" />
            <div className="text-center p-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mx-auto mb-1">
                <Database size={16} className="text-indigo-600" />
              </div>
              <p className="text-[9px] font-bold">Gutschrift in Xentral</p>
            </div>
            <ArrowRight size={14} className="text-gray-300" />
            <div className="text-center p-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-1">
                <ShoppingCart size={16} className="text-green-600" />
              </div>
              <p className="text-[9px] font-bold">Shopify Refund</p>
            </div>
            <ArrowRight size={14} className="text-gray-300" />
            <div className="text-center p-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-1">
                <CreditCard size={16} className="text-purple-600" />
              </div>
              <p className="text-[9px] font-bold">Payment Provider</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <h4 className="text-xs font-bold text-indigo-900 uppercase mb-2">Bundle Verification:</h4>
          <p className="text-xs text-indigo-700 leading-relaxed">
            When creating credit memos for bundles, <strong>verify that products are correctly exploded</strong>. 
            The Gutschrift view in Xentral helps ensure Shopify reports match Xentral inventory counts.
          </p>
        </div>
      </div>

      {/* Tax Parity Rule */}
      <div className="bg-red-50 p-8 rounded-3xl border border-red-100 space-y-6">
        <h3 className="text-xl font-bold text-red-900 flex items-center gap-2">
          <CheckCircle2 size={24} />
          Tax Parity: The "No Override" Rule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-red-800 text-sm">Xentral Responsibility</h4>
            <p className="text-xs text-red-700 leading-relaxed">
              Generates the <strong>legal invoice</strong>. If tax is wrong here, the invoice is legally incorrect and must be cancelled/reissued (Stornorechnung).
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-red-800 text-sm">Shopify Responsibility</h4>
            <p className="text-xs text-red-700 leading-relaxed">
              Calculates the <strong>VAT at checkout</strong>. If tax is wrong here, the VAT collection is incorrect, leading to tax liability gaps.
            </p>
          </div>
        </div>
        <div className="p-4 bg-white/50 rounded-xl border border-red-200">
          <p className="text-xs text-red-900 font-black uppercase tracking-widest text-center">
            Critical: Nothing overrides anything. Tax rates must be identical in both systems.
          </p>
        </div>
      </div>

      {/* Invoice Types */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Invoice Types in Xentral</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <h4 className="text-sm font-bold text-green-900 mb-2">Rechnung</h4>
            <p className="text-xs text-green-700">Standard invoice for B2C and B2B sales.</p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <h4 className="text-sm font-bold text-red-900 mb-2">Gutschrift</h4>
            <p className="text-xs text-red-700">Credit memo for refunds and returns.</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <h4 className="text-sm font-bold text-amber-900 mb-2">Stornorechnung</h4>
            <p className="text-xs text-amber-700">Cancellation invoice to void an incorrect invoice.</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 className="text-sm font-bold text-indigo-900 mb-2">Proforma</h4>
            <p className="text-xs text-indigo-700">Pro-forma invoice for customs or pre-payment.</p>
          </div>
        </div>
      </div>

      {/* Reporting & Reconciliation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <Calculator size={18} className="text-indigo-600" />
            Monthly Reconciliation Checklist
          </h4>
          <ul className="space-y-2 text-sm text-indigo-800">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Verify Shopify Payments match Xentral invoices</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Reconcile PayPal transactions separately</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Audit credit memos against Shopify refunds</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Filter out "BE Samples" from revenue reports</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Verify gift card liability balance</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h4 className="text-gray-700 font-bold mb-3 flex items-center gap-2">
            <HelpCircle size={18} className="text-gray-500" />
            Common Accounting Pitfalls
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <X size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
              <span>Counting gift card orders as revenue</span>
            </li>
            <li className="flex items-start gap-2">
              <X size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
              <span>Missing credit memos for Shopify refunds</span>
            </li>
            <li className="flex items-start gap-2">
              <X size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
              <span>Tax rate mismatch between systems</span>
            </li>
            <li className="flex items-start gap-2">
              <X size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
              <span>Including sample orders in sales totals</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
        <h4 className="text-green-900 font-bold mb-2 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-green-600" />
          Best Practice: Project-Based Filtering
        </h4>
        <p className="text-sm text-green-800">
          Always use <strong>Xentral Projects</strong> to segment your reporting. "BE Samples" orders should be in their own project, 
          allowing you to easily exclude them from revenue calculations while still tracking COGS and marketing expenses.
        </p>
      </div>
    </div>
  );
}


function MaterialsSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting
          </span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Stock & Inventory Logic</h2>
        <p className="text-gray-500">Managing stock levels, safety buffers, sync timing, and manual overrides.</p>
      </div>

      {/* Key Concept */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
        <h4 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
          <Truck size={18} />
          Zen (Aliko) is the Physical Source of Truth
        </h4>
        <p className="text-sm text-amber-800">
          The warehouse (Zen/Aliko) holds the actual physical inventory. Their system <strong>overwrites Xentral nightly</strong>, 
          and Xentral then pushes to Shopify. This chain ensures accuracy but creates timing considerations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold">Stock Synchronization Chain</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Truck className="text-orange-600" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-orange-900">Zen (Aliko) → Xentral</h4>
                <p className="text-xs text-orange-700">Overnight API sync (~2-4 AM). <strong>Overwrites</strong> Xentral numbers completely.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">NIGHTLY</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <ArrowRight className="text-gray-300 rotate-90" size={20} />
            </div>

            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Database className="text-indigo-600" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-indigo-900">Xentral → Shopify</h4>
                <p className="text-xs text-indigo-700">Constant push every <strong>~15 minutes</strong>. Keeps storefront updated.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">~15 MIN</span>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="text-gray-300 rotate-90" size={20} />
            </div>

            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ShoppingCart className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-green-900">Shopify Storefront</h4>
                <p className="text-xs text-green-700">Customers see updated stock. "Out of Stock" labels appear automatically.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-1 rounded">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
          <h3 className="text-xl font-bold">The 30-Unit Safety Buffer</h3>
          <p className="opacity-90 text-sm leading-relaxed">
            To prevent overselling, a total buffer of <strong>30 units</strong> is maintained across the chain:
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <div>
                <p className="font-medium">Zen (Aliko) Internal Buffer</p>
                <p className="text-[10px] opacity-60">Not reported to Xentral—held back internally</p>
              </div>
              <span className="font-bold text-xl">10</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <div>
                <p className="font-medium">Shopify Settings Buffer</p>
                <p className="text-[10px] opacity-60">Configured in Shopify inventory settings</p>
              </div>
              <span className="font-bold text-xl">20</span>
            </div>
            <div className="flex justify-between items-center pt-2 bg-white/10 -mx-4 px-4 py-3 rounded-xl">
              <span className="font-bold">Total Safety Margin</span>
              <span className="text-3xl font-black">30 Units</span>
            </div>
          </div>
          <p className="text-xs opacity-70 italic">
            This buffer protects against timing gaps between physical stock movements and system updates.
          </p>
        </div>
      </div>

      {/* Manual Stock Update Scenario */}
      <div className="bg-green-50 p-8 rounded-3xl border border-green-200">
        <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
          <CheckCircle2 size={24} className="text-green-600" />
          New Stock Delivery: Manual Update Workflow
        </h3>
        <p className="text-sm text-green-800 leading-relaxed mb-6">
          When new stock is delivered to Zen (Aliko) during the day and you need it available on Shopify <strong>immediately</strong> 
          (before the overnight sync), follow this process:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-green-200">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mb-3">1</div>
            <h4 className="text-sm font-bold text-green-900 mb-1">Delivery Arrives</h4>
            <p className="text-[10px] text-green-700">New stock delivered to Zen (Aliko) warehouse during business hours.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-green-200">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mb-3">2</div>
            <h4 className="text-sm font-bold text-green-900 mb-1">Manual Xentral Update</h4>
            <p className="text-[10px] text-green-700">Add stock manually in Xentral to reflect new inventory immediately.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-green-200">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mb-3">3</div>
            <h4 className="text-sm font-bold text-green-900 mb-1">Trigger Shopify Sync</h4>
            <p className="text-[10px] text-green-700">Manually trigger Bestandsynchronisierung to push to Shopify.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-green-200">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold mb-3">✓</div>
            <h4 className="text-sm font-bold text-indigo-900 mb-1">Overnight Correction</h4>
            <p className="text-[10px] text-indigo-700">Zen's nightly sync overwrites with accurate numbers.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/50 rounded-xl border border-green-300">
          <p className="text-xs text-green-900">
            <strong>Why this works:</strong> The manual update enables immediate sales, and the overnight sync from Zen 
            corrects any discrepancies automatically. No data is lost—Zen's numbers always win at night.
          </p>
        </div>
      </div>

      {/* Timing Diagram */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-center">Stock Sync Timing Overview</h3>
        <div className="relative">
          {/* Timeline */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-2">
                <Truck className="text-orange-600" size={24} />
              </div>
              <p className="text-xs font-bold">Zen (Aliko)</p>
              <p className="text-[9px] text-gray-400">Physical Stock</p>
            </div>
            
            <div className="flex-1 mx-4 relative">
              <div className="h-1 bg-gradient-to-r from-orange-300 via-indigo-300 to-green-300 rounded"></div>
              <div className="absolute top-4 left-1/4 transform -translate-x-1/2 text-center">
                <p className="text-[9px] font-bold text-orange-600">Nightly (~2-4 AM)</p>
                <p className="text-[8px] text-gray-400">Overwrites Xentral</p>
              </div>
              <div className="absolute top-4 right-1/4 transform translate-x-1/2 text-center">
                <p className="text-[9px] font-bold text-indigo-600">Every ~15 min</p>
                <p className="text-[8px] text-gray-400">Push to Shopify</p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-2">
                <Database className="text-indigo-600" size={24} />
              </div>
              <p className="text-xs font-bold">Xentral</p>
              <p className="text-[9px] text-gray-400">Central ERP</p>
            </div>

            <div className="flex-1 mx-4 relative">
              <div className="h-1 bg-gradient-to-r from-indigo-300 to-green-300 rounded"></div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="text-green-600" size={24} />
              </div>
              <p className="text-xs font-bold">Shopify</p>
              <p className="text-[9px] text-gray-400">Storefront</p>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Override Warning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <Database size={18} className="text-indigo-600" />
            Manual Stock Override in Xentral
          </h4>
          <p className="text-sm text-indigo-800 leading-relaxed mb-4">
            If the overnight sync is missed or stock needs to be available <strong>immediately</strong>, 
            you can manually add stock in Xentral:
          </p>
          <ul className="space-y-2 text-xs text-indigo-700">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Enables immediate Shopify sales</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Overnight sync will correct to real numbers</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> No risk of permanent data mismatch</li>
          </ul>
        </div>

        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <HelpCircle size={18} className="text-amber-600" />
            When to Use Manual Updates
          </h4>
          <ul className="space-y-3 text-sm text-amber-800">
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-600">•</span>
              <span>Large delivery arrives and you need stock live <strong>before tonight</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-600">•</span>
              <span>Product launch timing requires immediate availability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-600">•</span>
              <span>Overnight sync failed and stock shows 0 incorrectly</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h4 className="text-gray-700 font-bold mb-2 flex items-center gap-2">
            <HelpCircle size={18} className="text-gray-500" />
            Best Practice
          </h4>
          <p className="text-sm text-gray-600">
            When manually updating stock, <strong>always trigger the Shopify sync (Bestandsynchronisierung)</strong> 
            immediately after. Otherwise, Shopify won't reflect the new numbers until the next automatic 15-minute cycle.
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
          <h4 className="text-red-900 font-bold mb-2 flex items-center gap-2">
            <X size={18} className="text-red-500" />
            Overselling Risk
          </h4>
          <p className="text-sm text-red-800">
            If you manually add more stock than actually exists at Zen, you risk <strong>overselling</strong>. 
            The overnight sync will correct the numbers, but orders placed in between may not be fulfillable.
          </p>
        </div>
      </div>
    </div>
  );
}


function SamplesSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting
          </span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Samples & Influencer Orders</h2>
        <p className="text-gray-500">Managing non-revenue orders and promotional fulfillment.</p>
      </div>

      {/* Key Concept */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
        <h4 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
          <Package size={18} />
          Two Types of Sample Orders
        </h4>
        <p className="text-sm text-amber-800">
          Brain Effect handles samples through two distinct workflows: <strong>BE Samples</strong> (manual internal orders) 
          and <strong>BE Samples</strong> (influencer self-service via Shopify gift cards).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BA Samples - Manual Internal */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Database className="text-indigo-600" size={24} />
            "BE Samples" Project (Internal)
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Used by the <strong>Influencer Team</strong> for sending free items to partners. These orders are created manually in Xentral.
          </p>
          
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-900 uppercase mb-3">Workflow:</h4>
            <ol className="space-y-3 text-xs text-indigo-800">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">1</span>
                <span>Influencer team creates order manually in Xentral</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">2</span>
                <span>Order value is set to <strong>0.00 €</strong> (zero revenue)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">3</span>
                <span>Assigned to "BE Samples" project for tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">4</span>
                <span>Fulfillment goes directly to Zen (Aliko)</span>
              </li>
            </ol>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Key Rules:</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Zero Revenue (0.00 €)</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Manual creation in Xentral only</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Direct fulfillment via Zen (Aliko)</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> No Shopify involvement</li>
            </ul>
          </div>
        </div>

        {/* B Samples - Influencer Self-Service */}
        <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart size={24} />
            "BE Samples" Project (Self-Service)
          </h3>
          <p className="opacity-90 text-sm leading-relaxed">
            Affiliates, influencers and core team can order themselves via <strong>Shopify</strong> using <strong>Gift Cards</strong>. 
            These orders flow through the normal Shopify → Xentral pipeline.
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Users size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Shopify Customer Tagging</h4>
                <p className="text-xs opacity-70">Influencers are tagged in Shopify to automatically receive benefits:<strong>assigned budget</strong>.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <CreditCard size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Gift Card Payment</h4>
                <p className="text-xs opacity-70">Orders are paid with pre-loaded gift cards, resulting in <strong>zero cash revenue</strong>.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Database size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Xentral Project Mapping</h4>
                <p className="text-xs opacity-70">Orders with Affiliate, Influencer or Core Team are mapped to <strong>"BE Samples" project</strong> in Xentral for tracking.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Truck size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Normal Fulfillment Flow</h4>
                <p className="text-xs opacity-70">Order follows standard flow: Xentral → Delivery Note → Zen (Aliko) → Shipping.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-center">BE Samples (influencers) vs. BE Samples (self-order) Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-400 uppercase text-xs">Attribute</th>
                <th className="text-left py-3 px-4 font-bold text-indigo-600 uppercase text-xs">BE Samples (Internal)</th>
                <th className="text-left py-3 px-4 font-bold text-green-600 uppercase text-xs">BE Samples (Self-Service)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 font-medium">Created In</td>
                <td className="py-3 px-4">Xentral (Manual)</td>
                <td className="py-3 px-4">Shopify (Customer)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Payment Method</td>
                <td className="py-3 px-4">None (0.00 € order)</td>
                <td className="py-3 px-4">Gift Card (assigned budget)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Shipping Cost</td>
                <td className="py-3 px-4">N/A (internal)</td>
                <td className="py-3 px-4">Free (via tag)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Xentral Project</td>
                <td className="py-3 px-4">"BE Samples"</td>
                <td className="py-3 px-4">"BE Samples"</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Created By</td>
                <td className="py-3 px-4">Influencer Team</td>
                <td className="py-3 px-4">Influencer/Affiliate/Core Team</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Fulfillment</td>
                <td className="py-3 px-4">Direct to Zen</td>
                <td className="py-3 px-4">Standard Shopify Flow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Flow */}
      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
        <h3 className="font-bold text-lg mb-6 text-center">BE Samples Flow (Self-Service)</h3>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="text-center p-3">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-2">
              <Users className="text-green-600" size={20} />
            </div>
            <p className="text-[10px] font-bold">Influencer</p>
            <p className="text-[8px] text-gray-400">Tagged in Shopify</p>
          </div>
          
          <ArrowRight className="text-gray-300" size={16} />

          <div className="text-center p-3">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-2">
              <ShoppingCart className="text-green-600" size={20} />
            </div>
            <p className="text-[10px] font-bold">Shopify Order</p>
            <p className="text-[8px] text-gray-400">Gift Card</p>
          </div>
          
          <ArrowRight className="text-gray-300" size={16} />

          <div className="text-center p-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-2">
              <Database className="text-indigo-600" size={20} />
            </div>
            <p className="text-[10px] font-bold">Xentral</p>
            <p className="text-[8px] text-gray-400">"BE Samples" Project</p>
          </div>
          
          <ArrowRight className="text-gray-300" size={16} />

          <div className="text-center p-3">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-2">
              <Truck className="text-orange-600" size={20} />
            </div>
            <p className="text-[10px] font-bold">Zen (Aliko)</p>
            <p className="text-[8px] text-gray-400">Fulfillment</p>
          </div>
          
          <ArrowRight className="text-gray-300" size={16} />

          <div className="text-center p-3">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-2">
              <Package className="text-green-600" size={20} />
            </div>
            <p className="text-[10px] font-bold">Delivered</p>
            <p className="text-[8px] text-gray-400">To Influencer</p>
          </div>
        </div>
      </div>

      {/* Gift Card Warning */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
        <h4 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
          <CreditCard size={18} className="text-amber-600" />
          Gift Card Accounting Note
        </h4>
        <p className="text-sm text-amber-800">
          Gift cards are treated as a <strong>payment type</strong> in Xentral, not revenue. This can complicate accounting 
          reconciliation because they represent a liability until redeemed. The Accounting team must track gift card issuance 
          separately from actual sales.
        </p>
      </div>

      {/* Pro Tip */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h4 className="text-gray-700 font-bold mb-2 flex items-center gap-2">
          <HelpCircle size={18} className="text-gray-500" />
          Tracking Tip
        </h4>
        <p className="text-sm text-gray-600">
          Use the <strong>Project filter</strong> in Xentral to quickly see all sample orders. "BA Samples" shows internal sends, 
          while "B Samples" shows influencer self-orders. This helps separate promotional fulfillment from regular sales in reporting.
        </p>
      </div>
    </div>
  );
}


function ReturnsFlowSection() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting
          </span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Returns & Refunds Flow</h2>
        <p className="text-gray-500">Understanding the reverse logistics and refund processes.</p>
      </div>

      {/* Key Document */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
        <h4 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
          <Database size={18} />
          Central Document: Gutschrift (Credit Memo)
        </h4>
        <p className="text-sm text-amber-800">
          In Xentral, all refunds and returns are tracked via the <strong>Gutschrift (Credit Memo)</strong>. 
          This document is essential for accounting and links back to the original <strong>Auftrag (Sales Order)</strong>.
        </p>
      </div>

      {/* Two Main Flows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* RETOURE (Physical Return) */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Package className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-900">Retoure (Physical Return)</h3>
              <p className="text-xs text-gray-500">Product comes back to warehouse</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm font-bold text-gray-900">Return Trigger</p>
                <p className="text-xs text-gray-600 mt-1">Customer initiates return OR DHL delivery failure (undeliverable package)</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div className="flex-1 p-3 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-sm font-bold text-orange-900">Zen (Aliko) Receives Package</p>
                <p className="text-xs text-orange-700 mt-1">Warehouse scans return, updates inventory status</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm font-bold text-gray-900">Customer Service Contact</p>
                <p className="text-xs text-gray-600 mt-1">CS emails customer: <strong>"Refund or Re-shipment?"</strong></p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div className="flex-1 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-sm font-bold text-indigo-900">Xentral: Create Retoure</p>
                <p className="text-xs text-indigo-700 mt-1">CS logs the return in Xentral, linked to original Auftrag</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div className="flex-1 p-3 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm font-bold text-green-900">Stock Updated</p>
                <p className="text-xs text-green-700 mt-1">If product is resellable → Zen updates inventory → <strong>syncs to Xentral overnight</strong> → pushes to Shopify (~15 min)</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Re-shipment Policy:</h4>
            <p className="text-xs text-gray-600">
              First <strong>2 re-shipments are free</strong>. After that, customer may be charged for shipping.
            </p>
          </div>
        </div>

        {/* REFUND (Money Back) */}
        <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Refund (Erstattung)</h3>
              <p className="text-xs opacity-70">Money back to customer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div className="flex-1 p-3 bg-white/10 rounded-xl">
                <p className="text-sm font-bold">Xentral: Create Gutschrift</p>
                <p className="text-xs opacity-80 mt-1">CS creates Credit Memo for accounting purposes (full or partial)</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div className="flex-1 p-3 bg-amber-500/20 rounded-xl border border-amber-400/30">
                <p className="text-sm font-bold text-amber-200">CURRENT: Manual Shopify Trigger</p>
                <p className="text-xs opacity-80 mt-1">CS manually goes to Shopify backend and triggers the refund</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div className="flex-1 p-3 bg-white/10 rounded-xl">
                <p className="text-sm font-bold">Payment Provider Refund</p>
                <p className="text-xs opacity-80 mt-1">Shopify triggers refund via original payment method (Shopify Payments, PayPal, etc.)</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div className="flex-1 p-3 bg-white/10 rounded-xl">
                <p className="text-sm font-bold">Customer Receives Money</p>
                <p className="text-xs opacity-80 mt-1">Refund processed (timing depends on payment provider)</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/10 rounded-xl border border-white/20">
            <h4 className="text-xs font-bold uppercase mb-2">Refund Types:</h4>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold">Full Refund</span>
              <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold">Partial Refund</span>
              <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold">Shipping Only</span>
            </div>
          </div>
        </div>
      </div>

      {/* Automation Coming Soon */}
      <div className="bg-green-50 p-8 rounded-3xl border border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <CheckCircle2 className="text-green-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-900 mb-2">Coming Soon: Automated Refund Sync</h3>
            <p className="text-sm text-green-800 leading-relaxed mb-4">
              The <strong>Xentral ↔ Shopify connection is being tested</strong> to automatically trigger refunds. 
              Once live, the workflow will be:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-green-200">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold mb-2">1</div>
                <p className="text-xs font-bold text-green-900">Create Gutschrift in Xentral</p>
                <p className="text-[10px] text-green-700 mt-1">CS creates credit memo (full or partial)</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-green-200">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold mb-2">2</div>
                <p className="text-xs font-bold text-green-900">Auto-Sync to Shopify</p>
                <p className="text-[10px] text-green-700 mt-1">Connector automatically triggers Shopify refund</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-green-200">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold mb-2">3</div>
                <p className="text-xs font-bold text-green-900">Payment Provider Refund</p>
                <p className="text-[10px] text-green-700 mt-1">No manual Shopify action needed!</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-100 rounded-xl border border-green-300">
              <p className="text-xs text-green-900 font-bold">
                ✓ Benefit: Eliminates double-entry and reduces CS workload
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current vs Future Comparison */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-center">Current vs. Future Refund Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
              <X size={18} className="text-amber-600" />
              Current (Manual)
            </h4>
            <ol className="space-y-2 text-sm text-amber-800">
              <li>1. CS creates Gutschrift in Xentral</li>
              <li>2. CS opens Shopify backend</li>
              <li>3. CS finds the order</li>
              <li>4. CS manually triggers refund</li>
              <li>5. Payment provider processes</li>
            </ol>
            <p className="mt-4 text-xs text-amber-700 italic">~5-10 minutes per refund</p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
            <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-600" />
              Future (Automated)
            </h4>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. CS creates Gutschrift in Xentral</li>
              <li>2. Connector auto-syncs to Shopify</li>
              <li>3. Payment provider processes</li>
            </ol>
            <p className="mt-4 text-xs text-green-700 italic">~1-2 minutes per refund</p>
          </div>
        </div>
      </div>

            {/* Visual Flow Diagram - Enhanced */}
            <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-10 rounded-3xl border border-gray-100">
        <h3 className="font-bold text-xl mb-8 text-center text-gray-800">Complete Returns Decision Tree</h3>
        
        <div className="flex flex-col items-center gap-2">
          {/* Step 1: Return Triggered */}
          <div className="flex items-center gap-6 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center shadow-inner">
              <RotateCcw className="text-red-600" size={26} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Return Triggered</p>
              <p className="text-xs text-gray-500 mt-0.5">Customer return or DHL delivery failure</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-xs font-bold text-red-600">1</span>
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex flex-col items-center py-1">
            <div className="w-0.5 h-6 bg-gradient-to-b from-gray-200 to-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
              <ArrowRight className="text-gray-400 rotate-90" size={10} />
            </div>
          </div>

          {/* Step 2: Warehouse Receives */}
          <div className="flex items-center gap-6 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-inner">
              <Truck className="text-orange-600" size={26} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Zen (Aliko) Receives</p>
              <p className="text-xs text-gray-500 mt-0.5">Package scanned & logged at warehouse</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-xs font-bold text-orange-600">2</span>
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex flex-col items-center py-1">
            <div className="w-0.5 h-6 bg-gradient-to-b from-gray-200 to-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
              <ArrowRight className="text-gray-400 rotate-90" size={10} />
            </div>
          </div>

          {/* Step 3: Customer Service Contact */}
          <div className="flex items-center gap-6 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner">
              <Mail className="text-blue-600" size={26} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Customer Service Contact</p>
              <p className="text-xs text-gray-500 mt-0.5">CS emails: "Refund or Re-shipment?"</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">3</span>
            </div>
          </div>

          {/* Connector Line to Decision */}
          <div className="flex flex-col items-center py-1">
            <div className="w-0.5 h-6 bg-gradient-to-b from-gray-300 to-indigo-300"></div>
          </div>

          {/* Decision Point */}
          <div className="relative">
            <div className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-indigo-200">
              <p className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
                <HelpCircle size={16} />
                Customer Decision
              </p>
            </div>
          </div>

          {/* Branch Lines */}
          <div className="flex items-start justify-center w-full max-w-2xl pt-2">
            {/* Left Branch Line */}
            <div className="flex-1 flex justify-end pr-8">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-300 to-red-300"></div>
              </div>
            </div>
            
            {/* Right Branch Line */}
            <div className="flex-1 flex justify-start pl-8">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-300 to-green-300"></div>
              </div>
            </div>
          </div>

          {/* Two Paths */}
          <div className="flex gap-6 w-full max-w-2xl">
            {/* Refund Path */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-rose-500 p-4 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <CreditCard className="text-white" size={20} />
                  </div>
                  <h4 className="font-bold text-white">Refund</h4>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-red-600">1</span>
                    </div>
                    <span>Create Gutschrift in Xentral</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-red-600">2</span>
                    </div>
                    <span>Trigger refund in Shopify</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-red-600">3</span>
                    </div>
                    <span>Payment provider processes</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 text-center">💰 Money back to customer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Re-shipment Path */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Package className="text-white" size={20} />
                  </div>
                  <h4 className="font-bold text-white">Re-shipment</h4>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-green-600">1</span>
                    </div>
                    <span>Create new Auftrag</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-green-600">2</span>
                    </div>
                    <span>Generate Delivery Note</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-green-600">3</span>
                    </div>
                    <span>Zen (Aliko) ships again</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 text-center">📦 New package to customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Note */}
          <div className="mt-6 p-4 bg-white/80 rounded-xl border border-indigo-100 max-w-md text-center">
            <p className="text-xs text-indigo-700">
              <strong>Re-shipment Policy:</strong> First 2 re-shipments are free. After that, shipping may be charged.
            </p>
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h4 className="text-gray-700 font-bold mb-2 flex items-center gap-2">
            <HelpCircle size={18} className="text-gray-500" />
            Tracking Tip
          </h4>
          <p className="text-sm text-gray-600">
            Use the <strong>Gutschrift view</strong> in Xentral to see all credit memos linked to an order. 
            This helps verify if bundles are correctly exploded and matches Shopify reports.
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
          <h4 className="text-red-900 font-bold mb-2 flex items-center gap-2">
            <X size={18} className="text-red-500" />
            Common Pitfall
          </h4>
          <p className="text-sm text-red-800">
            Until automation is live, <strong>always verify</strong> that the Shopify refund was triggered after creating 
            the Gutschrift in Xentral. Double-check the payment status in Shopify admin.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChannelsSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Updated from Meeting
          </span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Amazon & ShopApoteke Channels</h2>
        <p className="text-gray-500">Understanding non-Shopify channel integrations and their unique requirements.</p>
      </div>

      {/* AMAZON SECTION */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-orange-100 rounded-2xl">
            <ShoppingCart className="text-orange-600" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-orange-900">Amazon Integration</h3>
            <p className="text-sm text-gray-500">Two fulfillment models with different data flows</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FBM - Special Products */}
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="text-orange-600" size={20} />
              <h4 className="font-bold text-orange-900">FBM (Fulfilled by Merchant)</h4>
            </div>
            <p className="text-sm text-orange-800 leading-relaxed mb-4">
              Special products that <strong>cannot go to Amazon warehouse</strong> due to strict handling requirements.
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="p-3 bg-white rounded-xl border border-orange-200">
                <h5 className="text-xs font-bold text-orange-900 uppercase mb-1">Products Handled by Zen:</h5>
                <ul className="text-xs text-orange-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <Package size={12} />
                    <span><strong>MCT Oil</strong> (Glass bottles - fragile)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Package size={12} />
                    <span><strong>Hormone Balance</strong> (Special handling)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-amber-100 rounded-xl border border-amber-300">
              <p className="text-[10px] text-amber-800">
                <strong>Why FBM?</strong> Amazon has strict rules about glass product delivery. These items ship directly from Zen (Aliko) via Billbee.
              </p>
            </div>

            {/* FBM Flow */}
            <div className="mt-4 pt-4 border-t border-orange-200">
              <h5 className="text-[10px] font-bold text-orange-600 uppercase mb-3">FBM Data Flow:</h5>
              <div className="flex items-center justify-between gap-2">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center mx-auto mb-1">
                    <ShoppingCart size={16} className="text-orange-700" />
                  </div>
                  <p className="text-[8px] font-bold">Amazon</p>
                </div>
                <ArrowRight size={14} className="text-orange-400" />
                <div className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-200 flex items-center justify-center mx-auto mb-1">
                    <Database size={16} className="text-blue-700" />
                  </div>
                  <p className="text-[8px] font-bold">Billbee</p>
                </div>
                <ArrowRight size={14} className="text-orange-400" />
                <div className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center mx-auto mb-1">
                    <Truck size={16} className="text-orange-700" />
                  </div>
                  <p className="text-[8px] font-bold">Zen</p>
                </div>
                <ArrowRight size={14} className="text-orange-400" />
                <div className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-green-200 flex items-center justify-center mx-auto mb-1">
                    <Users size={16} className="text-green-700" />
                  </div>
                  <p className="text-[8px] font-bold">Customer</p>
                </div>
              </div>
            </div>
          </div>

          {/* FBA - Standard Products */}
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Package className="text-gray-600" size={20} />
              <h4 className="font-bold text-gray-900">FBA (Fulfilled by Amazon)</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Standard products are sent to <strong>Amazon's warehouse</strong>. Amazon handles all fulfillment.
            </p>

            <div className="space-y-3 mb-4">
              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <h5 className="text-xs font-bold text-gray-700 uppercase mb-2">Data Handling:</h5>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <X size={12} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>NOT</strong> reflected in Xentral automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Data extracted from <strong>Amazon Merchant Portal</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Logged manually into <strong>Google Sheet</strong> for reporting</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-red-50 rounded-xl border border-red-200">
              <p className="text-[10px] text-red-800">
                <strong>Limitation:</strong> No direct sync. Manual extraction required for financial reporting and inventory reconciliation.
              </p>
            </div>

            {/* FBA Flow */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h5 className="text-[10px] font-bold text-gray-500 uppercase mb-3">FBA Data Flow:</h5>
              <div className="flex items-center justify-between gap-2">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-indigo-200 flex items-center justify-center mx-auto mb-1">
                    <Truck size={16} className="text-indigo-700" />
                  </div>
                  <p className="text-[8px] font-bold">Zen → Amazon</p>
                </div>
                <ArrowRight size={14} className="text-gray-400" />
                <div className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center mx-auto mb-1">
                    <Package size={16} className="text-orange-700" />
                  </div>
                  <p className="text-[8px] font-bold">Amazon WH</p>
                </div>
                <ArrowRight size={14} className="text-gray-400" />
                <div className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-green-200 flex items-center justify-center mx-auto mb-1">
                    <Users size={16} className="text-green-700" />
                  </div>
                  <p className="text-[8px] font-bold">Customer</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-[9px] text-gray-500">
                <span>Amazon Portal</span>
                <ArrowRight size={10} />
                <span>Google Sheet</span>
                <span className="text-gray-400">(Manual)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amazon Summary */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-xs text-amber-800">
            <strong>Key Takeaway:</strong> Amazon integration remains a technical challenge. FBM products (glass/special items) go through Billbee → Zen, 
            while FBA products require manual data extraction from Amazon Merchant Portal to Google Sheets.
          </p>
        </div>
      </div>

      {/* SHOPAPOTEKE SECTION */}
      <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/10 rounded-2xl">
            <Database size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">ShopApoteke</h3>
            <p className="text-sm opacity-80">Works similar to Shopify with one critical edge case</p>
          </div>
        </div>

        {/* Similar Flow to Shopify */}
        <div className="bg-white/10 p-6 rounded-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} />
            Standard Flow (Like Shopify)
          </h4>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="text-center p-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                <ShoppingCart size={20} />
              </div>
              <p className="text-[10px] font-bold">ShopApoteke</p>
              <p className="text-[8px] opacity-70">Order placed</p>
            </div>
            
            <ArrowRight size={16} className="opacity-50" />

            <div className="text-center p-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                <Database size={20} />
              </div>
              <p className="text-[10px] font-bold">Xentral</p>
              <p className="text-[8px] opacity-70">Picks up order</p>
            </div>
            
            <ArrowRight size={16} className="opacity-50" />

            <div className="text-center p-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                <Mail size={20} />
              </div>
              <p className="text-[10px] font-bold">Invoice Created</p>
              <p className="text-[8px] opacity-70">In Xentral</p>
            </div>
            
            <ArrowRight size={16} className="opacity-50" />

            <div className="text-center p-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                <Truck size={20} />
              </div>
              <p className="text-[10px] font-bold">Zen (Aliko)</p>
              <p className="text-[8px] opacity-70">Fulfillment</p>
            </div>
            
            <ArrowRight size={16} className="opacity-50" />

            <div className="text-center p-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                <Package size={20} />
              </div>
              <p className="text-[10px] font-bold">Shipped</p>
              <p className="text-[8px] opacity-70">To customer</p>
            </div>
          </div>
        </div>

        {/* Edge Case */}
        <div className="bg-amber-500/20 p-6 rounded-2xl border border-amber-400/30">
          <h4 className="font-bold text-amber-200 mb-3 flex items-center gap-2">
            <X size={18} />
            Edge Case: Invoice Delivery
          </h4>
          <p className="text-sm opacity-90 leading-relaxed mb-4">
            Unlike Shopify, Xentral <strong>cannot send invoices directly to ShopApoteke customers via email</strong> due to email encryption restrictions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/10 rounded-xl">
              <h5 className="text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <X size={14} className="text-red-300" />
                What Doesn't Work
              </h5>
              <p className="text-[11px] opacity-80">
                Email sending to customer's personal email address (encrypted/blocked by ShopApoteke).
              </p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl">
              <h5 className="text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-300" />
                Workaround
              </h5>
              <p className="text-[11px] opacity-80">
                Invoice is sent to the <strong>customer's ShopApoteke profile</strong> instead. Customer accesses it via their account.
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Flow Comparison */}
        <div className="bg-white/10 p-6 rounded-2xl">
          <h4 className="font-bold mb-4 text-center">Invoice Delivery: Shopify vs. ShopApoteke</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shopify Flow */}
            <div className="p-4 bg-green-500/20 rounded-xl border border-green-400/30">
              <h5 className="text-xs font-bold text-green-200 uppercase mb-3 flex items-center gap-2">
                <ShoppingCart size={14} />
                Shopify (Normal)
              </h5>
              <div className="flex items-center justify-center gap-2">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-1">
                    <Database size={14} />
                  </div>
                  <p className="text-[8px]">Xentral</p>
                </div>
                <ArrowRight size={12} className="opacity-50" />
                <div className="text-center">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-1">
                    <Mail size={14} />
                  </div>
                  <p className="text-[8px]">Email</p>
                </div>
                <ArrowRight size={12} className="opacity-50" />
                <div className="text-center">
                  <div className="w-8 h-8 rounded-lg bg-green-400/30 flex items-center justify-center mx-auto mb-1">
                    <Users size={14} />
                  </div>
                  <p className="text-[8px]">Customer ✓</p>
                </div>
              </div>
            </div>

            {/* ShopApoteke Flow */}
            <div className="p-4 bg-amber-500/20 rounded-xl border border-amber-400/30">
              <h5 className="text-xs font-bold text-amber-200 uppercase mb-3 flex items-center gap-2">
                <Database size={14} />
                ShopApoteke (Workaround)
              </h5>
              <div className="flex items-center justify-center gap-2">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-1">
                    <Database size={14} />
                  </div>
                  <p className="text-[8px]">Xentral</p>
                </div>
                <ArrowRight size={12} className="opacity-50" />
                <div className="text-center">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-1">
                    <ShoppingCart size={14} />
                  </div>
                  <p className="text-[8px]">SA Profile</p>
                </div>
                <ArrowRight size={12} className="opacity-50" />
                <div className="text-center">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/30 flex items-center justify-center mx-auto mb-1">
                    <Users size={14} />
                  </div>
                  <p className="text-[8px]">Customer ✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Sync Note */}
        <div className="p-4 bg-white/10 rounded-xl border border-white/20">
          <h5 className="text-xs font-bold uppercase mb-2 flex items-center gap-2">
            <RotateCcw size={14} />
            Manual Weekly Sync Required
          </h5>
          <p className="text-[11px] opacity-80">
            Invoices must be <strong>manually marked as shipped once per week</strong> to ensure they sync properly with the customer's ShopApoteke account portal.
          </p>
        </div>
      </div>

      {/* Summary Comparison */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-center">Channel Comparison Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-400 uppercase text-xs">Attribute</th>
                <th className="text-left py-3 px-4 font-bold text-green-600 uppercase text-xs">Shopify</th>
                <th className="text-left py-3 px-4 font-bold text-orange-600 uppercase text-xs">Amazon FBM</th>
                <th className="text-left py-3 px-4 font-bold text-gray-600 uppercase text-xs">Amazon FBA</th>
                <th className="text-left py-3 px-4 font-bold text-indigo-600 uppercase text-xs">ShopApoteke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 font-medium">Xentral Sync</td>
                <td className="py-3 px-4"><CheckCircle2 size={14} className="text-green-500" /></td>
                <td className="py-3 px-4"><span className="text-xs">Via Billbee</span></td>
                <td className="py-3 px-4"><X size={14} className="text-red-400" /></td>
                <td className="py-3 px-4"><CheckCircle2 size={14} className="text-green-500" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Fulfillment</td>
                <td className="py-3 px-4">Zen (Aliko)</td>
                <td className="py-3 px-4">Zen (Aliko)</td>
                <td className="py-3 px-4">Amazon</td>
                <td className="py-3 px-4">Zen (Aliko)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Invoice Delivery</td>
                <td className="py-3 px-4">Email (auto)</td>
                <td className="py-3 px-4">N/A</td>
                <td className="py-3 px-4">N/A</td>
                <td className="py-3 px-4">Profile (manual)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Data Reporting</td>
                <td className="py-3 px-4">Automatic</td>
                <td className="py-3 px-4">Billbee</td>
                <td className="py-3 px-4">Google Sheet</td>
                <td className="py-3 px-4">Automatic</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Special Products</td>
                <td className="py-3 px-4">All</td>
                <td className="py-3 px-4">Glass/Special</td>
                <td className="py-3 px-4">Standard</td>
                <td className="py-3 px-4">All</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h4 className="text-gray-700 font-bold mb-2 flex items-center gap-2">
          <HelpCircle size={18} className="text-gray-500" />
          Integration Priority
        </h4>
        <p className="text-sm text-gray-600">
          <strong>Shopify</strong> remains the most integrated channel. For Amazon FBA reporting, establish a regular cadence 
          for extracting data from Amazon Merchant Portal to Google Sheets. For ShopApoteke, set a weekly reminder to manually 
          sync invoice shipping status.
        </p>
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
