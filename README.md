MindBridge

MindBridge is a mental-health support platform designed to connect people seeking emotional support with verified psychology students and professionals in a safe, calming, and accessible way.
The goal is not to replace therapy, but to provide a first step of human connection and listening for those who need it.

⸻

🌱 Problem Statement

Many people struggle with stress, anxiety, and emotional overwhelm but hesitate to seek professional help due to:
	•	Fear of judgment
	•	High costs
	•	Lack of accessibility
	•	Intimidating clinical environments

MindBridge bridges this gap by offering confidential, supportive conversations in a non-threatening digital space.

⸻

💡 Idea & Concept
	•	Users can join as:
	•	Help Seekers → people looking for emotional support
	•	Supporters → psychology students or verified professionals
	•	Help Seekers can browse supporters and request help
	•	Supporters can view and accept incoming requests
	•	Sensitive information like email and password is never displayed publicly

⸻

🖥️ Frontend (Client Side)

Tech Stack
	•	JavaScript
	•	HTML
	•	CSS
	•	React (Single Page Application)

Key Features
	•	Single Page Application (SPA) → no page reloads
	•	Page navigation handled using state
	•	Role-based dashboards (Help Seeker / Supporter)
	•	Profile page with editable public information
	•	Responsive design (desktop + mobile)

Design Approach
	•	Minimal, calming UI
	•	Beige & light brown color palette → emotionally soothing
	•	Card-based layout for clarity and readability
	•	Simple interactions to avoid overwhelming users

State Management
	•	useState for:
	•	Page navigation
	•	User role
	•	Selected supporter
	•	useEffect + localStorage:
	•	Persist user role across refreshes

⸻

🧩 Backend (Server Side)

Tech Stack (Planned / Implemented)
	•	Node.js
	•	Express.js
	•	REST API
	•	Database (MongoDB / SQL – extendable)

Core Responsibilities
	•	User authentication (without exposing sensitive data)
	•	Fetching user profile information
	•	Updating editable profile fields (bio, pronouns, profile picture)
	•	Handling support requests between users
	•	Role-based access control (Help Seeker vs Supporter)

Example API Endpoints
	•	GET /api/user/:username → fetch public profile data
	•	PATCH /api/user/:username → update profile details
	•	POST /api/request → create a support request
	•	GET /api/requests → fetch supporter requests

Security & Privacy
	•	Emails and passwords are never sent to frontend
	•	Only public-safe fields are exposed
	•	Backend validation before updates
	•	Designed to support future encryption and moderation

⸻

🔐 Verification Strategy (Future Scope)
	•	Psychology students:
	•	College ID verification
	•	Course enrollment proof
	•	Professionals:
	•	License / certification upload
	•	Manual admin approval
	•	Verified badge shown only after approval

⸻

🚀 Future Enhancements
	•	Real-time chat or video sessions
	•	AI-based content moderation
	•	Emergency escalation for high-risk cases
	•	Rating & feedback system
	•	Admin dashboard for verification
	•	Appointment scheduling
