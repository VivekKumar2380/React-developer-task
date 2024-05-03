# React Developer Task

## Problem Statement
You are tasked with developing a React application using Ant Design that retrieves paginated data from the dummy JSON endpoint [https://dummyjson.com/posts](https://dummyjson.com/posts) and populates a table with this data. Additionally, the application should include a multi-select filter based on the `tags` property and a search input field to filter posts based on text matches in the `body` property. The state of pagination, filtering, and search should be persisted in the URL.

## Requirements

1. **Data Retrieval**: Implement a mechanism to fetch paginated data from the dummy JSON endpoint [https://dummyjson.com/posts?skip=10&limit=10](https://dummyjson.com/posts?skip=10&limit=10).
   
2. **Table Population**: Develop a table component using Ant Design to display the fetched data. The table should be paginated, with each page displaying a specified number of items.
   
3. **Multi-Select Filter**: Integrate a multi-select filter to allow users to filter posts based on the `tags` property. Users should be able to select multiple tags simultaneously to refine their search.
   
4. **Search Input Field**: Implement a search input field to enable users to filter posts based on text matches in the `body` property. As users type in the search input, the table should dynamically update to display only the posts that match the entered text.
   
5. **URL Persistence**: Ensure that the state of pagination, filtering, and search is persisted in the URL. This means that when users navigate away from the page and return later, they should see the same pagination page, selected filters, and search query as before.
   
6. **Routing**: Utilize React Router to handle navigation within the application.
   
7. **User Experience**: Design the application with a user-friendly interface, providing clear navigation and intuitive interactions.
   
8. **Responsive Design**: Ensure that the application layout adapts gracefully to different screen sizes and devices.
   
9. **Error Handling**: Implement error handling for cases such as failed data retrieval or invalid routes.

## Deliverables
- Fully functional React application built with Ant Design.
- Link to source code hosted on GitHub, containing all necessary files and dependencies.
- Demo video showcasing the functionality of the application. [Demo Video](https://drive.google.com/file/d/1m8tH9sdBtcVY_AKg9mh6r4EanNYNyU6F/view?usp=sharing)
---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Technologies Used

- React
- Ant Design
- React Router Dom
- Axios

## Folder Structure

\`\`\`
react-ant-design-pagination/
  ├── public/
  │   └── index.html
  ├── src/
  │   ├── components/
  │   │   ├── TableDisplay.jsx
  │   ├── pages/
  │   │   ├── HomePage.jsx
  │   │   └── NotFound.jsx
  │   ├── App.js
  │   ├── index.js
  │   └── ...
  ├── package.json
  ├── README.md
  └── ...
\`\`\`

## Additional Notes

- Ensure that the API endpoint [https://dummyjson.com/posts](https://dummyjson.com/posts) is accessible and provides the expected JSON response.
- For pagination, consider implementing a reusable pagination component to handle navigation between pages.
- Test the application thoroughly to ensure proper functionality across different scenarios and edge cases.

## Credits

This application was developed as a React developer task by Vivek.

