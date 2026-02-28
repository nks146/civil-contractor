import { useState } from "react";

export default function ProjectTabs() {

  const [activeTab,setActiveTab] = useState("overview");

  const tabs = [
    "overview",
    "project updates",
    "workers",
    "materials",
    "expenses",
    
  ];

  return (

    <div className="bg-gray-800 border border-gray-700 rounded-xl">

      <div className="flex border-b border-gray-700">

        {tabs.map(tab => (

          <button
            key={tab}
            onClick={()=>setActiveTab(tab)}
            className={`px-5 py-3 text-sm capitalize
            ${
              activeTab===tab
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab}

          </button>

        ))}

      </div>

      <div className="p-6">

        {activeTab==="overview" && <p>Overview Content</p>}
        {activeTab==="updates" && <p>Updates Content</p>}
        {activeTab==="workers" && <p>Workers Content</p>}
        {activeTab==="materials" && <p>Materials</p>}
        {activeTab==="expenses" && <p>Expenses</p>}
        

      </div>

    </div>
  );
}