# Frontend - Online Watch Store

This is the React, Tailwind CSS and Typescript frontend.

# Setup
```bash
npm install
```

> [!WARNING]
> You might want to update the npm package if something breaks or does not work.

```bash
npm update
```

# Run the project
```bash
npm run dev
```

Some components have tests so if you want to run the tests enter
```bash
npm test Button.test.tsx # Replace the file name but make sure the test exists for that file
```
Or
```bash
npm run test
```
to run all the available tests at once.

More tests will be added in the future and the code will be refactored in the future. Contributions are welcome.

## Algorithm

This project implements a fuzzy search feature using the Levenshtein Distance algorithm. I learned the algorithm concept from [this helpful video](https://www.youtube.com/watch?v=Dd_NgYVOdLk) and implemented it based on my understanding.
Since this is a learning implementation, the algorithm may not be fully optimized or perfect. Contributions and recommendations to improve it are very welcome!

# Project structure and components

Some components are straight forward and might not need explanation. But some components might need explanation about why they were created, where and how they are being used and when to use them in future.

##### Backdrop component
To create the dark and blurry background effect when a popup or side panel things appear. This component handles the closing or disappearing of the dark background as well so that we don't need to write the logic for that every time.

##### ConfirmModal component
Used when a popup thing should appear with confirm or cancel options. Used in the deletion of product (by admin).

##### Error component
To display fetching or validation errors. Created so that the error styling stay consisten throughout the project.

##### FetchStatusDisplay component
It is supposed to act as a container that shows loading while the data is being fetched, errors if there were any error while fetching and the component with data itself if the fetching is successful. The fetching and error handling logic is similar almost everywhere so I thought creating a component that handles all of those at once without having to write all of those logic again and again would be nice.

##### FormFieldWrapper component
If the name is confusing, it means a component that wraps form's fields. So it wraps things like label and input. It also displays the error (using the Error component). The component currently only has Label component (element). One could argue that the Input component (element) could be added inside this component to avoid providing input again and again but the reason is, we might use different kind of input sometimes like `textarea` or `select`. In that case, this component would not work. Surely there's a better way to handle all of this which will be done in the future.

##### ProductForms component
I made this component to avoid providing all the product fields in both add product and update product form. The ProductForm.tsx has the product form's necessary fields (using FormFieldWrapper and Input components) and the UpdateProductForm.tsx uses the ProductForm.tsx component inside it. Because the update product form is kind of like a popup thing (it does not redirect to a new page to update the product), the UpdateProductForm.tsx simply uses necessary styling to achieve that. 
The ProductForm.tsx component is used in AdminProductPage.tsx as well.

##### SidePanel component
The thing that renders from the side. It is used for Cart.tsx and Login and Register forms. It does the smooth transition and all that effect to make it look "modern". It handles the closing of the SidePanel as well. Uses Backdrop component too.

##### SuccessMessage component
Used to show successful message after adding and updating products and categories.

##### UserFormMenu component
Component that wraps login and register forms. The reason is so that switching between login and register forms become easy and passing some states that those two forms share will also be easy and centralised.

### hooks
Contains hooks for product forms.
- The useForm.ts is used for general forms to handle the validation using the dirty field state. The dirty field state is a flag for the input elements of the form that will be marked if they fail to validate while submitting the form. After those fields get marked, they will have a "live" validation that will constantly check if it passes the validation or not. Note that the dirty field state in our case only applies if the validation fails at least one time. I have used dirty field state for Login/Registration, Product and Checkout (Shipping Information) forms for now. Other forms like product category does include validation but not the dirty field state for now. This hook's functions can be used for almost every form.
- The useProductForm.ts is specifically for the product forms. The main reason to create this was because of the file handling and Typescript's constant warning when trying to use generic types with the File type. I figured it would be easier to create a new hook than to modify the generic type to accept the file type and all that.
- The useDirtyField.ts basically marks the fields as dirty. This hook is not used directly but is used via useForm.ts. The reason is because the useForm not only handles the validations and errors but also handles the API calling and all that. So I thought using the useDirtyField hook inside the useForm would centralise and would make it easier to manage. We just have to follow some certain rules like if you ever want to use useForm hook, you will have to pass values to it. Look into the useForm.ts to learn more about that.

### pages
Actual pages. The most confusing thing might be in the Profile folder.
- The entry point to the profile page is the UserProfile.tsx. It all starts from there. The UserProfileMenu is that menu/navigation kind of thing but only in the profile page(s).
- The UserAccount.tsx is the component that shows user's information like username and email (no password has been displayed) and a logout button.
- The admin folder contains pages specfic to admin like adding product (AdminProductPage.tsx) and managing categories (AdminProductCategory.tsx)
- The order folder displays the order/transaction history.
- Then the container folder is a container thing that wraps all the profile pages components. Because the styling like padding, background colour, page title, etc are similar, I thought putting similar things in once component and wrapping the other components with it would make it easier to manage and change in future.

### router
Includes routing for react SPA (Single Page Application).

### services
Contains API to communicate with backend.

### store
Contains global variable for the components to use. I am using Zustand for this project and the store includes all the global variables that needs to be accessed in different components without prop drilling. Some variables can definitely be excluded and made local to the component but that refactoring and optimisation is the work for future.

### types
Types for components to use. The types that has to be shared among different components or the same type that different components use are stored here.

### utils
Some functions that are important for the project which may need to be reused are stored here. These functions do not use any React states or depend on them. These are just basic Javascript functions.

Overall, the project itself is pretty messy but I feel like some refactoring like the functions in the useForm hooks are definitely useful. They will save a lot of time and and make things centralised and DRY which is very helpful for debugging.

> [!NOTE]
> This project is not meant to be taken as a template for production. It was a personal learning project. Any contributions are welcome.
