/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { supabase } from "/home/aman-kumar-chhari/Desktop/MERN/projects/Varta_laab-/forum/src/lib/supabaseClient";
import { ClipboardList, Users2, Eye } from "lucide-react";

const KaaryaKendra = () => {
  const [activeTab, setActiveTab] = useState("project");
  const [projectTab, setProjectTab] = useState("overview");
  const [user, setUser] = useState(null);

  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem("projects")) || []);
  const [team, setTeam] = useState(() => JSON.parse(localStorage.getItem("team")) || []);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [progressLogs, setProgressLogs] = useState(() => JSON.parse(localStorage.getItem("progressLogs")) || []);

  const [newProject, setNewProject] = useState({ id: "", title: "", description: "", startDate: "", endDate: "", status: "" });
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "", projectId: "" });
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "", dueDate: "", status: "", projectId: "" });
  const [newProgress, setNewProgress] = useState({ summary: "", date: "", projectId: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => { localStorage.setItem("projects", JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem("team", JSON.stringify(team)); }, [team]);
  useEffect(() => { localStorage.setItem("tasks", JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem("progressLogs", JSON.stringify(progressLogs)); }, [progressLogs]);

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    const id = Date.now().toString();
    const projectWithId = { ...newProject, id };
    setProjects([...projects, projectWithId]);
    setNewProject({ id: "", title: "", description: "", startDate: "", endDate: "", status: "" });
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email || !newMember.projectId) return;
    setTeam([...team, newMember]);
    setNewMember({ name: "", email: "", role: "", projectId: "" });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.projectId || !newTask.assignedTo) return;
    setTasks([...tasks, newTask]);
    setNewTask({ title: "", description: "", assignedTo: "", dueDate: "", status: "", projectId: "" });
  };

  const handleProgressSubmit = (e) => {
    e.preventDefault();
    if (!newProgress.summary || !newProgress.date || !newProgress.projectId) return;
    setProgressLogs([...progressLogs, newProgress]);
    setNewProgress({ summary: "", date: "", projectId: "" });
  };

  const tabs = [
    { id: "project", name: "Project Management", icon: <ClipboardList /> },
  
    { id: "profile", name: "Profile", icon: <Eye /> },
  ];

  const projectTabs = [
    { id: "overview", label: "\ud83d\udccc Overview" },
    { id: "team", label: "\ud83d\udc65 Add Team Member" },
    { id: "tasks", label: "\u2705 Add Task" },
    { id: "reports", label: "\ud83d\udcca Log Progress" },
    { id: "newproject", label: "\u2795 New Project" },
  ];

  return (
    <div className="p-4">

       <section className="relative w-full h-96 bg-cover bg-center rounded-b-3xl" style={{ backgroundImage: 'url("https://i.pinimg.com/736x/e9/d7/8b/e9d78bb7b60d07fc58ade74d494aa672.jpg")' }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-3xl" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Kaarya Kendra</h1>
          <p className="text-xl max-w-2xl">Connect. Collaborate. Contribute.</p>
        </div>
      </section>

      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded ${activeTab === tab.id ? "bg-indigo-600 text-white" : "bg-white text-black"}`}>{tab.icon} {tab.name}</button>
        ))}
      </div>

      {activeTab === "project" && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {projectTabs.map((ptab) => (
              <button key={ptab.id} onClick={() => setProjectTab(ptab.id)} className={`px-4 py-2 rounded-xl shadow ${projectTab === ptab.id ? "bg-indigo-500 text-white" : "bg-white text-gray-800"}`}>{ptab.label}</button>
            ))}
          </div>

          {projectTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((p, i) => {
                const members = team.filter(m => m.projectId === p.id);
                const taskList = tasks.filter(t => t.projectId === p.id);
                const progress = progressLogs.filter(pl => pl.projectId === p.id);
                return (
                  <div key={i} className="bg-white rounded-xl shadow p-6 space-y-2">
                    <h2 className="text-xl font-bold text-indigo-700">{p.title}</h2>
                    <p>{p.description}</p>
                    <p><strong>Duration:</strong> {p.startDate} to {p.endDate}</p>
                    <div>
                      <h4 className="font-semibold">Team Members:</h4>
                      {members.length ? <ul className="list-disc pl-4">{members.map((m, idx) => <li key={idx}>{m.name} ({m.role})</li>)}</ul> : <p>No members</p>}
                    </div>
                    <div>
                      <h4 className="font-semibold">Tasks:</h4>
                      {taskList.length ? <ul className="list-disc pl-4">{taskList.map((t, idx) => <li key={idx}>{t.title} - {t.assignedTo}</li>)}</ul> : <p>No tasks</p>}
                    </div>
                    <div>
                      <h4 className="font-semibold">Progress:</h4>
                      {progress.length ? <ul className="list-disc pl-4">{progress.map((pl, idx) => <li key={idx}>{pl.date} - {pl.summary}</li>)}</ul> : <p>No progress</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {projectTab === "newproject" && (
            <form onSubmit={handleProjectSubmit} className="space-y-2 bg-white p-4 rounded-xl shadow">
              <input type="text" placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className="border p-2 w-full rounded" />
              <textarea placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="border p-2 w-full rounded"></textarea>
              <input type="date" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} className="border p-2 w-full rounded" />
              <input type="date" value={newProject.endDate} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} className="border p-2 w-full rounded" />
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Create Project</button>
            </form>
          )}

          {projectTab === "team" && (
            <form onSubmit={handleMemberSubmit} className="space-y-2 bg-white p-4 rounded-xl shadow">
              <input type="text" placeholder="Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} className="border p-2 w-full rounded" />
              <input type="email" placeholder="Email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} className="border p-2 w-full rounded" />
              <input type="text" placeholder="Role" value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} className="border p-2 w-full rounded" />
              <select value={newMember.projectId} onChange={(e) => setNewMember({ ...newMember, projectId: e.target.value })} className="border p-2 w-full rounded">
                <option value="">Select Project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Member</button>
            </form>
          )}

          {projectTab === "tasks" && (
            <form onSubmit={handleTaskSubmit} className="space-y-2 bg-white p-4 rounded-xl shadow">
              <input type="text" placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="border p-2 w-full rounded" />
              <input type="text" placeholder="Assigned To" value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} className="border p-2 w-full rounded" />
              <select value={newTask.projectId} onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })} className="border p-2 w-full rounded">
                <option value="">Select Project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Task</button>
            </form>
          )}

          {projectTab === "reports" && (
            <form onSubmit={handleProgressSubmit} className="space-y-2 bg-white p-4 rounded-xl shadow">
              <input type="text" placeholder="Summary" value={newProgress.summary} onChange={(e) => setNewProgress({ ...newProgress, summary: e.target.value })} className="border p-2 w-full rounded" />
              <input type="date" value={newProgress.date} onChange={(e) => setNewProgress({ ...newProgress, date: e.target.value })} className="border p-2 w-full rounded" />
              <select value={newProgress.projectId} onChange={(e) => setNewProgress({ ...newProgress, projectId: e.target.value })} className="border p-2 w-full rounded">
                <option value="">Select Project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Progress</button>
            </form>
          )}
        </>
      )}

   

      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">\ud83d\udc64 Your Profile</h2>
          {user ? (
            <div className="space-y-3 text-sm">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at).toLocaleString()}</p>
              {user.user_metadata?.full_name && <p><strong>Name:</strong> {user.user_metadata.full_name}</p>}
              {user.user_metadata?.avatar_url && <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-20 h-20 rounded-full border object-cover" />}
              <button onClick={async () => { await supabase.auth.signOut(); setUser(null); }} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
            </div>
          ) : <p>You are not logged in.</p>}
        </div>
      )}
    </div>
  );
};

export default KaaryaKendra;
