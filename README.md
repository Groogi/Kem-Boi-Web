<p align="center">
  <img width="217" height="205" alt="image" src="https://github.com/user-attachments/assets/07726160-1a50-4886-86fd-7df22a0ad3aa" />
</p>

<h1 align="center" style="margin-top"> Kemboi </h1>

### __Description__

Kemboi is a premium avocado dessert brand based on the Gold Coast, Australia. Reimagining traditional Vietnamese flavors, we combine fresh avocado mousse with artisanal coconut ice cream and customizable toppings. This platform is a modern, technology-driven loyalty ecosystem designed for community building and long-term scalability.

<img width="500" height="400" alt="image" src="https://github.com/user-attachments/assets/8d561338-7ae1-478a-aac8-24340fe93013" />

### __Key Features__

### 🥑 **Core Customer Experience & Loyalty Engine**
*   **Digital Punch-Card System:** A modern visual recreation of traditional café punch cards. The UI automatically translates raw points into physical "punches" (**200 points = 1 Punch**), giving users immediate, gamified feedback on their progress toward free items.
*   **Tiered Status Badges:** Customers automatically graduate through visual loyalty tiers based on their total point balance. Badges are displayed prominently on both their dashboard and the admin directory:
    *   **Bronze:** 0 - 199 points
    *   **Silver:** 200 - 499 points
    *   **Gold:** 500 - 999 points
    *   **Platinum:** 1,000+ points
*   **Live Rewards Marketplace:** Customers can browse a dynamic catalog of available rewards. The system actively checks their point balance and disables claiming if they have insufficient funds.
*   **Redemption Tracking Wallet:** Once a reward is claimed, users receive a digital redemption ticket with a live status tracker (Pending, Used, Fulfilled) so they know exactly when to pick up their item.
*   **Referral Loop Integration:** New users can enter a referral code during registration. The backend securely uses PostgreSQL row-locking (`FOR UPDATE`) to validate the code, automatically issuing a 100-point bonus to the referrer and a 50-point welcome gift to the new member.

### 🛡️ **Advanced Authentication & Security**
*   **Omnichannel Login:** Supports both traditional encrypted Email/Password registration (using bcrypt) and seamless Google OAuth 2.0 integration via JWT (JSON Web Tokens).
*   **Premium Member Identity:** The database automatically assigns clean, branded account IDs (e.g., `kb-1234`) upon registration to maintain a premium feel.
*   **Secure Password Recovery:** A fully functioning "Forgot Password" flow that generates time-sensitive, secure reset tokens delivered via automated email.
*   **Robust Data Validation:** Custom toast notifications and inline UI highlights (red rings) guide users through input errors without relying on ugly default browser alerts.

### 👑 **Admin Command Center (Staff Workflow)**
*   **Customer Directory:** A real-time data table allowing staff to search the entire customer base by Name, Email, or custom `kb-id`.
*   **Dual-Logic Onboarding:** A massive workflow optimization. Instead of separate processes for adding users and issuing points, staff can use the "Add Points" tool on an unregistered email. The system intelligently detects they aren't registered, safely stores the points in a `PendingBonus` table, and automatically emails the user an invitation to claim their waiting points.
*   **Advanced Rewards Manager:** Admins have granular control over reward physics:
    *   *Global Inventory Limits:* Restrict a highly-coveted item (like a plushie) to only 50 total claims globally.
    *   *Personal Claim Limits:* Restrict users from claiming the same reward more than once.
    *   *Lifecycle Management:* Set precise start/end dates, or mark items as "Never Expires."
*   **Redemption Fulfillment Pipeline:** Staff can view all incoming reward claims, safely update their statuses to complete the transaction, or use "Direct Fulfill" to bypass the customer flow and issue a reward manually.

### 🌐 **Dynamic Content Management (CMS)**
*   **Live Store Locations Editor:** Instead of hardcoding HTML, the Landing Page fetches store locations directly from the database. Admins can add new pop-up stalls, update addresses, attach Google Maps URLs, and toggle locations to "Inactive" instantly via the dashboard.
*   **Centralized Social Links:** Instagram, Facebook, and Website links are managed via the Admin Panel, automatically cascading updates down to the public-facing footer.

### ✉️ **Automated Transactional Notifications**
*   **Mailgun SMTP Integration:** Reliable, automated background email delivery.
*   **Personalized "Pending Bonus" Emails:** When an admin uses the onboarding feature, the system sends a beautifully formatted email using the customer's first name, notifying them that points have been securely vaulted for them, driving instant conversions.
*   **Security Emails:** Automated password reset delivery.

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
2.  **Google OAuth**: Add your production domain (`APP_DOMAIN`) to the "Authorized redirect URIs" and "Authorized JavaScript origins" in your Google Cloud Console. **Failure to do this will break Google Login.**
3.  **Mailgun**: Verify your `MAILER_DOMAIN` and update the SMTP credentials.
