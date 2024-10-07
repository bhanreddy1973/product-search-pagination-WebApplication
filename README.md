# Product Search and Display App

This project is a Product Search and Display Application built with React, Redux, and Axios. The application fetches product data from the DummyJSON API and displays it with category filtering, search functionality, and lazy loading (pagination).

## Features

- **Category Filtering**: Select a product category to view products specific to that category.
- **Search Functionality**: Search for products by partial names, with search results that are not case-sensitive.
- **Pagination**: Products are fetched in batches of 10 from the API. As you scroll, new products load dynamically.
- **Redux State Management**: Product and category data are stored using Redux.
- **Query Parameters**: The selected category and search input are stored as URL query parameters to allow deep linking and state persistence across reloads.
- **Responsive UI**: User-friendly interface 

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Ensure that you have the following installed:

- Node.js (v14 or above)
- npm (Node package manager)

### Installation Instructions

Follow these steps to set up and run the project on your local machine:

1. Clone the Repository:
   ```bash
   git clone https://github.com/bhanreddy1973/product-search-pagination-app.git
   cd product-search-pagination-app
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Install Redux and related packages:
   ```bash
   npm install redux react-redux @reduxjs/toolkit
   ```

4. Install Bootstrap:
   ```bash
   npm install bootstrap
   ```

5. Install other necessary packages:
   ```bash
   npm install axios react-router-dom react-paginate
   ```

6. Run the Development Server:
   ```bash
   npm start
   ```

   The app will now be running locally on `http://localhost:3000`.

## Application Structure


```
src/
│
├── components/
│   ├── AppContent.js
│   ├── CategoryList.js
│   ├── ErrorBoundary.js
│   ├── ProductList.js
│   └── SearchBar.js
│
├── store/
│   ├── actions/
│   │   └── productActions.js
│   ├── reducers/
│   │   ├── productReducer.js
│   │   ├── index.js
│   │   └── productSlice.js
│   └── store.js
│
├── App.css
├── App.js
├── App.test.js
└── index.css
```

### Key Components and Files

- **components/**
  - `AppContent.js`: Main content component of the application
  - `CategoryList.js`: Displays and manages product categories
  - `ErrorBoundary.js`: Handles error catching and display
  - `ProductList.js`: Renders the list of products
  - `SearchBar.js`: Handles product search functionality

- **store/**
  - **actions/**
    - `productActions.js`: Defines Redux actions for products
  - **reducers/**
    - `productReducer.js`: Manages product state changes
    - `index.js`: Combines all reducers
    - `productSlice.js`: Defines the product slice using Redux Toolkit
  - `store.js`: Configures and exports the Redux store

- `App.js`: Main application component
- `App.css`: Styles for the main App component
- `index.css`: Global styles
- `App.test.js`: Tests for the App component


## API Endpoints

The app interacts with the following API endpoints from DummyJSON:

- Categories Endpoint:
  ```
  GET https://dummyjson.com/products/categories
  ```

- Products Endpoint:
  ```
  GET https://dummyjson.com/products?limit=10&skip=0
  ```

- Search Endpoint:
  ```
  GET https://dummyjson.com/products/search?q={search-term}
  ```

## Application Walkthrough

### Home Page

On page load, the app fetches all available categories and displays products from all categories (or the first 10 if pagination is enabled).

### Search Functionality

Users can search for products by typing into the search bar. The app fetches products that match the search term from the API.

### Category Filtering

Users can select a category to filter the displayed products. If no category is selected, the app defaults to showing products from all categories.

### Pagination

The app fetches products in batches of 10. As the user scrolls down, more products are loaded and displayed.

### Query Parameters

- **Category**: When a category is selected, the URL is updated with the selected category:
  ```
  http://localhost:3000/?category=smartphones
  ```

- **Search Term**: When a search is performed, the search term is added to the query parameters:
  ```
  http://localhost:3000/?category=smartphones&search=iphone
  ```

## Limitations

- Initial Page Load: The app fetches the first 10 products from all categories on load.
- Category Selection: Only one category can be selected at a time (single-select).
- No Backend: The app relies solely on the DummyJSON API.

## Future Enhancements

- Improved Search with fuzzy search 
- Enhanced UI with more interactivity 
- Local Pagination for better performance on large datasets

## Tech Stack

- React
- Redux
- Axios
- React-Router
- React-Paginate
- Bootstrap
- Custom CSS



## Screenshots

![image](https://github.com/user-attachments/assets/df61224d-56a7-4747-9c9f-4407d40a392d)   (default page)
![image](https://github.com/user-attachments/assets/bd90ca1a-1023-4358-9a28-c938ce1ee1aa)   (specific category)
![image](https://github.com/user-attachments/assets/53ed6fce-57be-45d5-ac22-0be361cfac16)   (using searchbar with semi-word )
![image](https://github.com/user-attachments/assets/327c4d2c-925c-4415-bdc1-4efc3b4641e2)   (using searchbar with full-word )

## Contributing

If you'd like to contribute to this project, feel free to open issues or submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
