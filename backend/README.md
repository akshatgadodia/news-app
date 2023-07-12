## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running the following command:

```bash
npm install
```

## Configuration

Before starting the server, make sure to configure the environment variables. Create a `.env` file in the project root directory and update the necessary variables. The following environment variables should be set:

```plaintext
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

Replace `your_database_username` and `your_database_password` with your actual database credentials.

## Starting the Server

To start the server, run the following command:

```bash
npm run server
```

This will start the backend server using Node.js and connect it to the configured MongoDB database.

## Usage

Once the server is running, you can access the application through the provided endpoints and interact with the frontend user interface.