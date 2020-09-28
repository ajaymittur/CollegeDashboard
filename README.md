# CollegeDashboard (CoDash)

A super intuitive web application that allows a student to share notes, enter and display his/her marks, attendance, provide his CGPA and essentially an overview of his/her performance, along with a striking visual representation of the above data with the help of graphs and charts. 

**UPDATE**: My AWS credits have expired and hence features that use AWS services such as file upload will **not work**

## Tech Stack

- Front-End: [**React**](https://reactjs.org/)
- Back-End: [**NodeJS**](https://nodejs.org/en/)
- Database: [**Firebase**](https://firebase.google.com/)
- Storage: [**AWS S3**](https://aws.amazon.com/s3/)
- CSS (_React_): [**Semantic UI**](https://react.semantic-ui.com)

## Folder Structure

 - `/` - Backend server code
 - `/client` - React frontend code
 - `/client/src/assets` - Images, icons, etc.
 - `/client/src/components` - React components and their styles
 - `/client/src/customHooks` - Custom React Hooks
 - `/firebase` - Code that interacts with firebase API & services (authentication & database)
 - `/aws` - Code that sets up AWS sdk and exposes upload functionality to the route through its API
