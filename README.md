<p align="center">
  <img width="217" height="205" alt="image" src="https://github.com/user-attachments/assets/07726160-1a50-4886-86fd-7df22a0ad3aa" />
</p>

<h1 align="center" style="margin-top"> Kem Boi </h1>

### __Description__

Kem Boi is a dessert brand launching on the Gold Coast, Australia. The company specializes in a Vietnamese-style avocado dessert combining avocado mousse, ice cream, and customizable toppings. The goal of the brand is not only to sell a product, but to build a modern, technology-driven ecosystem focused on customer engagement, community building, and long-term scalability.

<img width="500" height="400" alt="image" src="https://github.com/user-attachments/assets/8d561338-7ae1-478a-aac8-24340fe93013" />


### Frontend Dependencies

#### NodeJS
```https://nodejs.org/en```

#### React-router-dom
```npm install react-router-dom```

#### Tailwind, Postcss, Autoprefixer
```npm install -D tailwindcss@^3.4.0 postcss autoprefixer```

### Backend Dependencies

#### Ruby & Rails
```https://rubyonrails.org/```

#### PostgreSQL
```https://www.postgresql.org/download/```

#### Ruby Gems (Authentication, CORS, Database)
The backend uses **BCrypt** for password hashing, **JWT** for secure user sessions, and **Rack-Cors** for CORS configuration. Make sure to download and start PostgreSQL before installing the Ruby gems.
```bash
cd backend
bundle install
```

---

## PostgreSQL Installation

1. **Download**: Install PostgreSQL from the [official website](https://www.postgresql.org/download/).
2. **Service**: Ensure the PostgreSQL service is running on the default port (5432).
3. **Database Config**: Update `backend/config/database.yml` with your local PostgreSQL `username` and `password`.

## Environment Variables

The backend uses a `.env` file for local configuration. Create a copy of the example file:

```bash
cd backend
cp .env.example .env
```
Update the values in `.env` to match your local PostgreSQL configuration.

## Database Setup

Run the following commands in the backend directory to initialize the database with demo data:

```bash
cd backend
rails db:drop db:create db:migrate db:seed
rails s
```

### Access Credentials
- **Admin**: `admin@kemboi.com` / `password123`
- **Customer**: `tester@kemboi.com` / `password123`

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Demo Information

The database seed includes pre-configured accounts for testing:

- **Admin**: `admin@kemboi.com` / `password123`
- **Customer**: `tester@kemboi.com` / `password123`

The customer account is pre-loaded with **800 points**, which automatically populates **4 punches** on the loyalty card. The seed also includes three store locations and two active giveaways for UI demonstration.



