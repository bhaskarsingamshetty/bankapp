🏦 Banking Management System – Spring Boot Project

📌 About the Project



This is a Banking Management System backend built using Spring Boot.

The project is designed as a student-level full-stack project, but it follows real banking concepts.



The system allows users to:



create accounts



apply for loans



buy insurance



send money through transactions



secure login using JWT authentication



The goal of this project is to understand:



REST APIs



Spring Boot architecture



database tables and relations



JWT-based authentication



CRUD operations



service and controller layer separation



🛠 Technologies Used



Java



Spring Boot



Spring Data JPA



Spring Security



JWT (JSON Web Token)



MySQL / any relational DB



Lombok



👥 Users in System



There is no admin panel in this project.



Only normal registered users can:



login



manage accounts



perform transactions



view loan and insurance details



🔐 Authentication (JWT Login System)



The project uses JWT tokens instead of session login.



How it works



User signs up



User logs in → receives JWT token



Token must be added in Authorization Header of every request:



Authorization: Bearer <token>



Without token → request is blocked



With token → user can access secured APIs



Passwords are encrypted using BCrypt, so real password is never stored.



🧩 Project Modules (Implemented)



✅ 1. User Module



Users can:



sign up



log in



receive JWT token



Data stored:



user id



name



email



phone



password (hashed)



✅ 2. Account Module



Users can have bank accounts.



Data stored:



account number



balance



account type (savings/current etc.)



linked customer



Features:



create account



view account details



fetch accounts by customer id



✅ 3. Loan Module



Users can apply for loans.



Details stored:



loan type (home/personal/education etc.)



loan amount



tenure



interest rate



status (approved/pending/rejected)



customer reference



This demonstrates:



many-to-one relation



real banking logic simulation



✅ 4. Insurance Module



Users can purchase insurance policies.



Stored details:



insurance type



policy amount



premium details (if added)



customer reference



Insurance data can be inserted manually (admin not implemented).



✅ 5. Transaction Module 💸 (Core Feature)



Users can transfer money between bank accounts.



They provide:



sender account number



receiver account number



amount



System checks:



✔ account exists

✔ sender is valid

✔ receiver is valid

✔ balance is sufficient

✔ cannot transfer to same account



Then:



sender balance decreases



receiver balance increases



The whole method is wrapped in @Transactional, so:



if anything fails → money is not deducted



ensures safe transaction behaviour



🗄 Database Overview

Main tables used



users



accounts



loans



insurance



(optional) transactions history later



Tables are linked using:



primary keys



foreign key relations (@ManyToOne)



This helps understand real database relationships.



🧱 Project Architecture (Simple Explanation)



The project follows layered architecture:



Controller  →  Service  →  Repository  →  Database



Controller



Receives HTTP requests (API layer)



Service



Business logic is written here



Repository



Communicates with database using JPA



Model / Entity



Represents database table structure



DTO



Used for input/output data transfer



🚀 How to Use the Project



Clone project



Configure MySQL database in application.properties



Run the Spring Boot application



Use Postman to test APIs



First signup → login → copy token



Paste token in Authorization Header



Now access secured APIs



🎓 Why this project is good for students



This project demonstrates:



✔ real-world banking concepts

✔ full JWT authentication flow

✔ CRUD operations

✔ Spring Boot fundamentals

✔ relational database handling

✔ validation and error responses

✔ transactional money updates



✨ Future Enhancements (Optional)



You may add later:



transaction history table



mini statement API



admin portal



email notifications



transaction PIN



OTP verification



Not required, but nice if time permits.



✅ Conclusion



This project is a complete student-level banking backend system.

It focuses on clear logic, security, and clean structure while still being easy to understand.



It is a great way to learn:



Spring Boot



REST APIs



JWT security



Database relations



Banking domain basics

