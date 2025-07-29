Vayu Shuddhi - IoT Air Quality Dashboard
Vayu Shuddhi is a modern, full-stack IoT dashboard built to monitor and manage air quality data from connected devices. It provides a clean, responsive interface for visualizing real-time data, viewing historical logs, and managing the monitoring devices themselves.

The frontend is built with Next.js and TypeScript, styled with Tailwind CSS, and uses a component library based on shadcn/ui. The backend is powered by Supabase, providing the database, authentication, and real-time capabilities.

Features
Real-time Dashboard: A central dashboard to visualize live air quality metrics from connected IoT devices.

Historical Data Logs: View and analyze past data logs to identify trends and patterns in air quality.

Device Management: An interface to add, remove, and manage the configuration of your monitoring devices.

AI-Powered Settings: A dedicated view to configure AI-related parameters for data processing or predictive analytics.

Modern UI/UX: Built with shadcn/ui and Tailwind CSS for a responsive, accessible, and themeable (light/dark mode) user experience.

Supabase Integration: Leverages Supabase for a robust backend, including database and real-time data synchronization.

Tech Stack
Getting Started
Follow these instructions to set up and run the project locally.

Prerequisites
Node.js (v18.x or later)

npm, pnpm, or yarn

A free  account

1. Clone the Repository
2. Install Dependencies
Install the required packages using your preferred package manager:

3. Set Up Supabase
Go to  and create a new project.

Navigate to the SQL Editor in your Supabase project and run the necessary SQL scripts to set up your tables (e.g., for devices, data logs). You may need to create a schema.sql file for this.

Go to Project Settings > API. Find your Project URL and anon (public) key.

4. Configure Environment Variables
Create a new file named .env.local in the root of the project directory and add your Supabase credentials:

Replace YOUR_SUPABASE_PROJECT_URL and YOUR_SUPABASE_ANON_KEY with the actual values from your Supabase project.

5. Run the Development Server
Start the Next.js development server:

Open  in your browser to see the application.

Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
Distributed under the MIT License. See LICENSE file for more information.

Contact
Divesh Kankani - kankanifivesh6@gmail.com

Project Link: https://vayushuddhi.vercel.app/
