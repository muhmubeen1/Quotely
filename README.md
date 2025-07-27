

# 📚 Quotely Backend

**Quotely** is a quote management SaaS platform built for readers to save, organize, and interact with quotes from books. This is the backend of the application, developed using **Node.js**, **Express**, and **PostgreSQL**.

---

## 🚀 Features

- ✅ User registration and login with JWT authentication
- ✅ Add, update, delete books
- ✅ Add, update, delete quotes associated with books
- ✅ Filter and search quotes
- ✅ Secure user-specific data access
- ✅ PostgreSQL database with relational structure
- 📤 Export saved quotes to PDF or text files *(upcoming)*
- 🗣️ Text-to-Speech playback of quotes *(upcoming)*
- 📷 Scan-to-Text (OCR) to extract quotes from book images *(upcoming)*
- ☁️ Cloud image upload and storage for scanned pages *(upcoming)*
- 🏷️ Add tags and categories to quotes *(upcoming)*

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Optional Tools (upcoming)**:
  - Google Cloud Vision API / Tesseract.js (OCR)
  - gTTS / AWS Polly (Text-to-Speech)
  - Cloudinary / Firebase Storage (image storage)

---

## 📂 Project Structure

```

quotely-backend/
├── controllers/        # Route logic
├── routes/             # API endpoints
├── models/             # DB queries / ORM models
├── middleware/         # Auth and error handling
├── utils/              # OCR, TTS, etc.
├── config/             # App configuration
├── app.js              # Entry point
└── package.json

````

---

## 📦 API Endpoints Overview

### Auth
- `POST /api/auth/register` – Register
- `POST /api/auth/login` – Login

### Books
- `GET /api/books`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

### Quotes
- `GET /api/books/:bookId/quotes`
- `POST /api/books/:bookId/quotes`
- `PUT /api/quotes/:id`
- `DELETE /api/quotes/:id`

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/quotely-backend.git
cd quotely-backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
PORT=5000
DATABASE_URL=your_postgres_connection
JWT_SECRET=your_jwt_secret
```

### 4. Run the server

```bash
npm start
```

