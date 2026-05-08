<p align="center">
  <img width="217" height="205" alt="image" src="https://github.com/user-attachments/assets/07726160-1a50-4886-86fd-7df22a0ad3aa" />
</p>

<h1 align="center" style="margin-top"> Kemboi </h1>

### __Description__

Kemboi is a premium avocado dessert brand based on the Gold Coast, Australia. Reimagining traditional Vietnamese flavors, we combine fresh avocado mousse with artisanal coconut ice cream and customizable toppings. This platform is a modern, technology-driven loyalty ecosystem designed for community building and long-term scalability.

<img width="500" height="400" alt="image" src="https://github.com/user-attachments/assets/8d561338-7ae1-478a-aac8-24340fe93013" />

### __Key Features__

- **Loyalty Card System**: Integrated punch-card logic where points translate directly to physical "punches" on a digital member card.
- **Premium Member IDs**: Clean, lowercase `kb-xxxx` format for all users.
- **Dynamic Rewards Engine**: Support for global stock limits, personal claim limits, and "Never Expires" permanent offers.
- **Admin Command Center**: Real-time customer search (by Name, Email, or ID), location management, and safe reward deletion logic.
- **Automated Notifications**: Transactional emails for welcome points, pending bonuses, and password resets.

### __Prerequisites__

Before starting, ensure you have the following installed:
- **Ruby**: `3.4.x`
- **Node.js**: `20.x` or higher
- **PostgreSQL**: Ensure the service is running locally.

---

## Getting Started

### 1. Backend Setup
```bash
cd backend
bundle install
# Create .env from .env.example and update your DB credentials
rails db:create db:migrate db:seed
rails s
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access Credentials (Demo)
- **Admin**: `admin@kemboi.com` / `password123`
- **Customer**: `tester@kemboi.com` / `password123`

---

## Deployment & Environment Configuration

To run this project in production or a new environment, you must configure the following Environment Variables:

### Backend Variables (Render/Production)
- `RAILS_MASTER_KEY`: **CRITICAL** - Key to unlock encrypted credentials.
- `DATABASE_URL`: Production PostgreSQL connection string.
- `APP_DOMAIN`: Your main domain (e.g., `demokemboi.com`). This handles CORS and mailer links.
- `MAILER_DOMAIN`: Your verified email sending domain (e.g., `mg.demokemboi.com`).
- `MAILER_FROM`: The sender email address (e.g., `noreply@demokemboi.com`).
- `MAILGUN_SMTP_LOGIN`: Your Mailgun SMTP username.
- `MAILGUN_SMTP_PASSWORD`: Your Mailgun SMTP password.

### Frontend Variables (Vercel/Static Hosting)
- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth 2.0 Client ID.
- `VITE_API_URL`: The full URL of your backend API service (e.g., `https://notework.onrender.com`).

---

### __Final Handoff Checklist__

1.  **Environment Variables**: Ensure all keys above are set in your hosting dashboards (Render & Vercel).
2.  **Google OAuth**: Add your production domain (`APP_DOMAIN`) to the "Authorized redirect URIs" in your Google Cloud Console.
3.  **Mailgun**: Verify your `MAILER_DOMAIN` and update the SMTP credentials.
