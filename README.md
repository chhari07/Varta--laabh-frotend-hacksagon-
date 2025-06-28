# 🗣️ Varta Laabh – Frontend

**Varta Laabh** is a civic-tech platform built to promote open democratic discussions, collaborative drafting, community-based project management, blogging, and public inquiry forums. This repository contains only the **frontend (React.js)** codebase.

---

##  Features

###  Samuhik Charcha (Collective Discussion)
- **Lok Manthan:** Raise public topics, add articles, and allow public opinion.
- **Advanced Polls:** Conduct issue-based upvote/downvote polls.
- **People’s Drafts:** Citizens propose, support, or oppose draft bills.
- **Live WebSocket Updates:** Real-time updates using `socket.io`.

### 🛠️ Kaarya Kendra (Project Management)
- **Project Management:** Create, track, and visualize social initiatives.
- **Team Management:** Assign roles and manage volunteers.
- **Task Tracker:** Manage tasks with due dates and statuses.
- **Progress Reports:** Dynamic bar charts of task performance.
- **Evidence Log:** Upload before/after visuals.
- **Civic Templates:** Download campaign material like RTI forms or posters.

### 📰 Blog Bazaar (Community Blogboard)
- **Create & Publish Blogs:** Users can share informative blogs on policy, law, governance, and social issues.
- **Tag-based Filtering:** View posts by topics like Education, Climate, Economy, etc.
- **Like & Comment System:** Encourage dialogue on civic knowledge.
- **Moderation-ready UI:** For future moderation and review pipelines.

### ❓ Poocho Bolo (Ask & Answer)
- **Public Q&A Forum:** Ask questions about policy, laws, rights, and local governance.
- **Threaded Answers:** Get responses and follow-ups from citizens or experts.
- **Upvote Best Answers:** Let community highlight the most relevant responses.
- **Search + Filter Support:** Quickly find related questions.

### 👤 Profile
- Authenticated profile using Supabase.
- Shows user ID, email, name, avatar, and logout.
- Works across all modules (Samuhik Charcha, Kaarya Kendra, Blog Bazaar, Poocho Bolo).

---

## 🧱 Tech Stack

| Layer        | Tech                               |
|--------------|-------------------------------------|
| Frontend     | **React.js**, **Tailwind CSS**      |
| Auth & DB    | [Supabase](https://supabase.com)    |
| Real-time    | [Socket.IO](https://socket.io)      |
| PDF/Canvas   | `html2canvas` for download/export   |
| Icons        | `Lucide-react`                      |
| Routing      | `react-router-dom` (optional setup) |

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:chhari07/Varta--laabh-hacksagon-.git
cd Varta--laabh-hacksagon-
