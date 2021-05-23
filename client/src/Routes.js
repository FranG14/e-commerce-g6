import React from "react";
import { Route, Switch } from "react-router-dom";
import UserDetail from './components/UserDetail/userDetail'
import AdminPost from "./containers/Admin/adminPost";
import AdminEdit from "./components/CrudProduct/editProduct";
import AuthForm from './components/LogIn-Register/authform.jsx';
import AdminCatalog from "./containers/Admin/adminCatalog";
import CompleteCatalog from "./containers/CompleteCatalog/completeCatalog";
import Home from "./containers/Home/index.jsx";
import  DetailProduct  from "./components/ProductDetail/productDetail";
import PostCategory from "./components/CrudCategory/categoryPost.jsx";
import CategoryEdit from './components/CrudCategory/categoryEdit.jsx'
import AddCategory from "./containers/AllCategories/allCategory.jsx";
import About from "./containers/About/about";
import Cart from "./components/Cart/cart"
import UserTableEdit from "./components/UserEdit/usersTableEdit";
import UserEdit from "./components/UserEdit/userEdit";
import UsersTable from "./components/UsersTable/usersTable";
import AdminAction from "./components/AdminAction/adminAction";
import UserPassword from "./components/UserEdit/userPassword";
import Reviews from "./components/ProductReviews/reviews";
import AddReview from "./components/ProductReviews/addReview";



export default function Routes() {
  return (
    <Switch>
    {/*>>>>>>>>>>>>>>> USER ROUTES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}

      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/shop">
        <CompleteCatalog />
      </Route>
      <Route exact path="/product/:id">
        <DetailProduct />
      </Route>
      <Route exact path="/myProfile">
        <UserDetail />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/cart">
        <Cart/>
      </Route>
      <Route exact path="/reviews/:id">
        <Reviews />
      </Route>
      <Route exact path="/reviews/add/:id">
        <AddReview />
      </Route>
    {/*>>>>>>>>>>>>>>> ADMIN ROUTES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}
      <Route exact path="/admin">
        <AdminCatalog />
      </Route>
      <Route exact path ="/editProduct/:id">
        <AdminEdit/>
      </Route>
      <Route exact path="/post">
        <AdminPost />
      </Route>
      <Route exact path="/auth">
        <AuthForm />
      </Route>      
      <Route exact path="/categories">
        <AddCategory />
      </Route>
      <Route exact path="/postCategory">
        <PostCategory />
      </Route>      
      <Route exact path="/editCategory/:id">
        <CategoryEdit/>
      </Route>
      <Route exact path="/myProfile/Edit/:id">
        <UserEdit/>
      </Route>
      <Route exact path="/myProfile/Edit/:id">
        <UserEdit/>
      </Route>
      <Route exact path="/Admin/Actions">
        <AdminAction />
      </Route>
      <Route exact path="/cart">
        <Cart/>
      </Route>
      <Route exact path="/users/">
        <UsersTable/>
      </Route>
      <Route exact path="/users/edit/:id">
        <UserTableEdit />
      </Route>
      <Route exact path="/users/password/:id">
        <UserPassword />
      </Route>
    </Switch>
  );
}