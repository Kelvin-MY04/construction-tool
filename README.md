# Data Label Preparation for Construction Floor Plan Calculation

## Description

This is a data label preparation project tool for construction floor plan calculation AI project. This project provides faster data labeling functions for over thousand floor plans, designed to be driven by users.

### User Management

- **User Configuration**: Users are initially defined in `/configs/` as YAML files
- **New User Registration**: To register new user accounts, create a new YAML file named after the username in the `/configs/` directory
- **Admin Account**: Admin account is already defined in the codebase
- **Data Distribution**: Data splitting for users function is automatically involved in the admin account

### Storage

Floor plan files are stored on Google Cloud Storage Platform.

## Installation

### Prerequisites

1. **Install Dependencies**

   Run one of the following commands to install node modules:

```bash
   npm install
```

or

```bash
   bun add .
```

2. **Google Cloud Platform Setup**

   Create a service account in Google Cloud Platform with appropriate permissions for Cloud Storage access.

3. **Environment Configuration**

   Create a `.env.local` file in the project root directory and add the following environment variables:

```bash
   # .env.local
   GOOGLE_CLOUD_PROJECT_ID=<YOUR_PROJECT_ID>
   GOOGLE_CLOUD_BUCKET_NAME=<YOUR_BUCKET_NAME>
   GOOGLE_CLOUD_CLIENT_EMAIL=<YOUR_CLIENT_EMAIL>
   GOOGLE_CLOUD_PRIVATE_KEY=<YOUR_PRIVATE_KEY>
```

## Usage

### Running the Development Server

Start the development server using one of the following commands:

```bash
npm run dev
```

or

```bash
bun run dev
```

The project will be accessible at `http://localhost:3000`

## Project Structure

```
.
├── configs/          # User configuration YAML files
├── .env.local        # Environment variables (not committed to repository)
└── ...
```

## Notes

- Ensure your Google Cloud service account has the necessary permissions to read/write to the specified bucket
- Keep your `.env.local` file secure and never commit it to version control
- Add `.env.local` to your `.gitignore` file if not already present
