import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { ToDoList } from "./ToDoList";

//create your first component
const Home = () => {
	return (
		<div className="d-flex flex-column align-items-center">
			<h1>To Do's</h1>
			<ToDoList />
		</div>
	);
};

export default Home;