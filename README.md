# Node.js Assignment

This is a Node.js application to create, fill, and retrieve form data using RESTful API standards.

## Technologies Used
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- UUID
- dotenv
- express-validator
- winston

## Installation

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd src

2. Install the dependencies:
     ```sh
    npm install

3. Create a .env file in the root directory and add the following:

     ```sh
    DB_HOST="Your host name"
    DB_NAME="Your DB Name"
    DB_USER="Your DB User"
    DB_PASSWORD="Your DB Password"
    PORT=3000
    NODE_ENV=development

4. Start the server:
     ```sh
    npm start



## API Endpoints

Create Form
URL: POST /api/form



Fill Data
URL: POST /api/fill_data


Get All Data
URL: GET /api/fill_data?form_title=user


### Notes
1. **Validation:** Implemented using `express-validator` for better request validation.
2. **Logging:** Using `winston` for better logging practices.
3. **Configuration:** Environment variables are managed using the `.env` file and `dotenv` package.
4. **Error Handling:** Enhanced error handling in controllers.
5. **Scalability:** The directory structure follows best practices for scalability and maintainability.




