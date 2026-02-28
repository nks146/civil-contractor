import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import ProjectOverview from "../../components/project/ProjectOverview";
import ProjectSummaryCards from "../../components/project/ProjectSummaryCards";
//import ProjectTabs from "../../components/project/ProjectTabs";
import OverviewTab from "../../components/project/OverviewTab";
import ProjectUpdatesTab from "../../components/project/ProjectUpdatesTab";
import WorkersTab from "../../components/project/WorkersTab";
import MaterialsTab from "../../components/project/MaterialsTab";
import ExpensesTab from "../../components/project/ExpensesTab";
import { getProjectById,getLatestPost,getProjectPosts,getProjectWorkers,
  getProjectUsedMaterials,getProjectExpenses
        } from "../../services/projectService";


export default function ProjectDetails(){

const {id}=useParams();
const [activeTab,setActiveTab] = useState("overview");

const [project,setProject]=useState(null);
const [summary,setSummary] = useState({
    workers: 0,
    labourCost: 0,
    materialCost: 0,
    otherExpenses: 0,
    totalExpenses: 0
  });
  
const [latestPost,setLatestPost] = useState(null);
const [posts,setPosts] = useState([]);
const [workers,setWorkers] = useState([]);
const [materials,setMaterials] = useState([]);
const [expenses,setExpenses] = useState([]);

 useEffect(()=>{
   loadProject();
 },[]);

 const loadProject=async()=>{
   const data=await getProjectById(id);
   setProject(data);

 }

  useEffect(()=>{
    if(activeTab==="overview")
      loadLatestPost();
    if(activeTab==="updates")
      loadPosts();
    if(activeTab==="workers")
      loadWorkers();
    if(activeTab==="materials")
      loadMaterials();
    if(activeTab==="expenses")
      loadExpenses();
  },[activeTab]);

  const loadLatestPost = async () => {
    const data = await getLatestPost(id);
    if (!data) {
      setLatestPost(null);
      return;
    }

    // normalize images field
    if (typeof data.images === 'string') {
      data.images = data.images ? data.images.split('##') : [];
    } else if (!Array.isArray(data.images)) {
      data.images = [];
    }

    setLatestPost(data);
  };

  const loadPosts = async () => {
    const data = await getProjectPosts(id); console.log(data);
    // convert images field from ##-separated string to array
    const normalized = data.map((post) => {
      if (post && typeof post.images === 'string') {
        return {
          ...post,
          images: post.images ? post.images.split('##') : []
        };
      }
      return post;
    });
    setPosts(normalized);
  };

  const loadWorkers = async()=>{
    const data = await getProjectWorkers(id);
    setWorkers(data);

    /* calculate summary */
    const totalCost = data.reduce(
      (sum,w)=> sum + Number(w.total_wage),0);

    setSummary(prev=>({
      ...prev,
      workers:data.length,
      labourCost:totalCost
    }));

  };

  const loadMaterials = async ()=>{
    const data = await getProjectUsedMaterials(id);
    setMaterials(data);
    /* calculate summary */
    const totalCost = data.reduce(
      (sum,m)=> sum + Number(m.total),0);

    setSummary(prev=>({
      ...prev,
      materialCost:totalCost
    }));
  }

  const loadExpenses = async ()=>{
    const data = await getProjectExpenses(id);
    setExpenses(data);
    /* calculate summary */
    const totalCost = data.reduce(
      (sum,e)=> sum + Number(e.amount),0);

    setSummary(prev=>({
      ...prev,
      otherExpenses:totalCost
    }));  
  }

 if(!project) return <p>Loading...</p>

  return (
    <div>
      <ProjectOverview project={project} />
      <ProjectSummaryCards summary={summary} />
      <div className="bg-gray-800 border border-gray-700 rounded-xl">
        <div className="flex border-b border-gray-700">
          <TabButton
            label="Overview"
            tab="overview"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            label="Project Updates"
            tab="updates"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            label="Workers"
            tab="workers"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            label="Materials"
            tab="materials"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            label="Expenses"
            tab="expenses"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="p-6">
          {activeTab === "overview" &&
            <OverviewTab latestPost={latestPost} />
          }
          {activeTab === "updates" &&
            <ProjectUpdatesTab posts={posts} />
          }
          {activeTab === "workers" &&
            <WorkersTab workers={workers} />
          }
          {activeTab === "materials" &&
            <MaterialsTab materials={materials} />
          }
          {activeTab === "expenses" &&
            <ExpensesTab expenses={expenses} />
          }
        </div>
      </div>
    </div>
  );
}

/* ---------- TAB BUTTON ---------- */

function TabButton({label,tab,activeTab,setActiveTab}){
 return(
  <button
   onClick={()=>setActiveTab(tab)}
   className={`px-5 py-3 text-sm
   ${
    activeTab===tab
    ? "border-b-2 border-blue-500 text-blue-400"
    : "text-gray-400 hover:text-gray-200"
   }`}
  >
   {label}
  </button>
 )
}