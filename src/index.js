import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/blog/blog'
import Add from './components/blog/add'
import About from './components/about/about'
import Post from './components/blog/post'
import { BrowserRouter as Router, Route
} from "react-router-dom";
import CreateMember from './components/about/aboutAdd';
import Event from './components/events/events';
import FetchPhotos from './components/Gallery/gallery';
import GetPostByTag from './components/blog/tag';
import SearchQueryContent from './components/Search/Search';
import Login from './components/login/login'
import Logout from './components/login/logout';
import EditPost from './components/post-actions/postPUT';
import PostRubbish from './components/post-actions/postsRUBBISH';
import Allcomments from './components/comments/comments-all'
import registeredMembers from './components/about/members';
import CreateGallery from './components/Gallery/gallery-add'
import Declaration from './components/declaration/declaration';

ReactDOM.render((
  <Router>
    <Route exact path='/' component={Home} />
    <Route exact path='/blog' component ={Home}/>
    <Route exact path = '/dodaj' component = {Add}/>
    <Route exact path ='/post/:url/:id' component ={Post}/>
    <Route exact path = '/about' component = {About}/>
    <Route exact path = '/about/create' component = {CreateMember}/>
    <Route exact path ='/events' component = {Event}/>
    <Route exact path = '/gallery' component = {FetchPhotos}/>
    <Route exact path = '/:nazwa/posts' component = {GetPostByTag}/>
    <Route exact path = '/search' component = {SearchQueryContent}/>
    <Route exact path = '/login' component = {Login}/>
    <Route exact path = '/edit/post/:id' component ={EditPost}/>
    <Route exact path = '/post-rubbish' component ={PostRubbish}/>
    <Route exact path = '/comments-all' component = {Allcomments}/>
    <Route exact path ='/members' component ={registeredMembers}/>
    <Route exact path ='/gallery-add' component = {CreateGallery}/>
    <Route exact path ='/declaration-input' component={Declaration}/>
  </Router>
  ),
  document.getElementById('root')
);

