Here are two separate instructions, one for the **frontend** and one for the **backend**:  

---

### **Frontend Instructions**  
**Objective**: Build a modern, visually engaging frontend with the following features:  
1. **UI Design**:  
   - Support both dark and light modes, with a toggle switch for users to switch themes.  
   - Large grid background with a transparent morphing glass effect for card and modal components.  
   - Smooth animations, hover effects, and transitions for interactive elements.  
   - Beautifully styled icons and charts integrated for enhanced visuals.  
   - Fully responsive layout for desktop, tablet, and mobile screens.  

2. **Landing Page**:  
   - Create a modern, attractive landing page to showcase the website’s features and courses.  
   - Include sections like Hero, Features, Courses, Testimonials, and Contact Us.  
   - Smooth scrolling animations and call-to-action buttons.  

3. **Technology Stack**:  
   - Use **Next.js** for the React-based framework.  
   - Utilize **ShadCN UI** for pre-styled components and Tailwind CSS for styling.  
   - Integrate **Chart.js** or **Recharts** for displaying interactive charts and graphs.  
   - Use **Heroicons** or similar icon libraries for visuals.  

4. **Additional Features**:  
   - Ensure optimal performance and SEO optimization.  
   - Include an interactive student dashboard with access to videos, assessments, and challenges.  

---

### **Backend Instructions**  
**Objective**: Develop a robust backend to manage the website's functionality with the following features:  
1. **Core Functionalities**:  
   - **Authentication**: Use **Clerk** for secure user authentication and authorization.  
   - **Database**: Use **Supabase** for data storage, including managing users, courses, payments, and tracking student progress.  
   - **Admin Management**: Create APIs for managing courses, users, and payments efficiently.  

2. **Student Dashboard**:  
   - Build APIs for fetching and updating video content, assessments, and student progress data.  
   - Provide endpoints for real-time updates on assessments and coding challenges.  

3. **Coding Environment**:  
   - Develop backend logic to support an online code editor and compiler. This includes storing student code submissions and returning results.  

4. **Scalability and Performance**:  
   - Implement server-side logic to handle a growing user base efficiently.  
   - Use caching and optimized queries for faster API responses.  

5. **Technology Stack**:  
   - Use **Next.js API Routes** or a standalone **Node.js/Express.js** server for backend logic.  
   - Leverage **Supabase Functions** for serverless tasks where needed.  
   - Integrate with third-party payment processors like Stripe for handling payments.  

6. **APIs**:  
   - Secure RESTful APIs for communication between the frontend and backend.  

---

Both the frontend and backend should maintain seamless integration, with an emphasis on performance, accessibility, and user-friendly design. Let me know if you need a more detailed breakdown of any section

### **Core Functionalities and Structure**

#### **Core Functionalities**

1. **Authentication and Authorization**  
   - Use **Clerk** for managing user registration, login, and session handling.  
   - Secure role-based access for students and admins.  

2. **Courses Management**  
   - Admin features to create, update, and delete courses.  
   - Store course content, videos, and materials in **Supabase**.  
   - Support for categorizing courses by type (e.g., Full-Stack Development, Graphic Design, Motion Graphics).  

3. **Student Dashboard**  
   - Personalized dashboard for each student:  
     - Access to enrolled courses.  
     - Video playback with progress tracking.  
     - Interactive assessments and challenges with auto-grading.  
   - Real-time coding environment and compiler.  

4. **Payment Integration**  
   - Use **Sifalo** for handling course payments.  
   - Generate invoices and track transaction history.  

5. **Progress Tracking**  
   - Track student performance on assessments and challenges.  
   - Provide detailed analytics for students and admins.  

6. **Frontend Features**  
   - **Landing Page**:  
     - Dynamic course display with brief descriptions and enrollment options.  
     - Interactive hero section with animations.  
   - **Dark/Light Mode**:  
     - Toggle feature for user preference.  

7. **Backend Features**  
   - API endpoints for managing users, courses, and payments.  
   - Serverless functions via **Supabase** for real-time updates.  

8. **Responsive and Modern UI**  
   - Built with **ShadCN** and **Tailwind CSS**.  
   - Transparent morphing glass effects and animations.  

---

### **Structure**

#### **Frontend**:  
- **Framework**: Next.js with ShadCN UI.  
- **Features**:  
  - Dynamic routing for pages (e.g., Home, Courses, Dashboard).  
  - Tailwind CSS for styling, animations, and hover effects.  
  - Chart.js or Recharts for student progress analytics.  

#### **Backend**:  
- **Authentication**: Clerk for user authentication and authorization.  
- **Database**: Supabase for managing data storage and serverless functions.  
- **API**: RESTful API endpoints for CRUD operations (Courses, Users, Payments).  
- **Payment Gateway**: Stripe integration for transactions.  

---

### **Documentation**

#### **Clerk Authentication**  
- **Setup Guide**:  
  1. Install Clerk using `npm install @clerk/nextjs`.  
  2. Configure Clerk in `_app.js` with API keys.  
  3. Use `<SignIn />` and `<SignUp />` components for authentication.  

- **Docs**:  
  - Official documentation: [Clerk Docs](https://clerk.dev/docs)  

#### **Supabase Setup**  
- **Setup Guide**:  
  1. Install Supabase using `npm install @supabase/supabase-js`.  
  2. Configure Supabase client with project URL and API key.  
  3. Create tables for courses, users, payments, and progress tracking.  

- **Docs**:  
  - Official documentation: [Supabase Docs](https://supabase.com/docs)  

#### **Next.js with ShadCN**  
- **Setup Guide**:  
  1. Install ShadCN components using the CLI.  
  2. Use Tailwind CSS for custom themes and responsiveness.  
  3. Add animations using Tailwind utilities.  

- **Docs**:  
  - ShadCN: [ShadCN Docs](https://shadcn.dev/)  
  - Tailwind CSS: [Tailwind Docs](https://tailwindcss.com/docs)  

Let me know if you’d like code snippets or further customization!