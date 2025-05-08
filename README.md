# SplitzVille

**SplitzVille** is a modern, full-stack web application that makes splitting group expenses easy, transparent, and fun. Designed for friends, roommates, and teams, SplitzVille helps you track, manage, and settle shared expenses effortlessly.

---

## 🚀 Demo
Will be added soon
[Live Demo Link](https://your-demo-url.com)

---

## 📝 Features

- **User Authentication:** Secure signup, login, and email verification
- **Group Management:** Create groups for trips, roommates, or events
- **Expense Tracking:** Add, edit, and split expenses equally or unequally
- **Real-Time Balances:** Instantly see who owes whom
- **Settlements:** Settle up debts with clear transaction history
- **Analytics:** Visualize spending by group or category (coming soon)
- **Responsive UI:** Works beautifully on mobile and desktop
- **Secure:** Passwords hashed, JWT authentication, and secure API practices

---

## 🛠️ Tech Stack

**Frontend:**
- React (TypeScript, Vite)
- Tailwind CSS
- React Router
- Lucide Icons
- Framer Motion (for animations)

**Backend:**
- Node.js + Express
- PostgreSQL (hosted on Supabase or other cloud provider)
- Sequelize ORM
- JWT for authentication
- Nodemailer for transactional emails

---

## ⚡ Getting Started

### 1. **Clone the repository**
```
git clone https://github.com/yourusername/splitzville.git
cd splitzville
```

### 2. **Set up the backend**
```
cd backend
cp .env.example .env
```

Fill in your Postgres/Supabase and SMTP credentials in .env
```
npm install
npm run dev
```

### 3. **Set up the frontend**
```
cd ../frontend
cp .env.example .env
```

Set your backend API URL in .env
```
npm install
npm run dev
```

### 4. **Access the app**

Open [http://localhost:5173](http://localhost:5173) (or as shown in your terminal) in your browser.

---

## ⚙️ Configuration

**Backend `.env` example:**
```
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=your_email@gmail.com
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

**Frontend `.env` example:**
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Folder Structure
```
splitzville/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.tsx
│   └── public/
│
└── README.md
```


---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.
---

## 📬 Contact

For questions, feedback, or support, please open an issue or email [webdev.by.adi@gmail.com](mailto:webdev.by.adi@gmail.com).

---

**Enjoy using SplitzVille to make group expenses easy, fair, and stress-free!**
