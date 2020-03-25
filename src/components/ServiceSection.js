import React from 'react';
import Skills from './Skills';

const ServiceSection = (props) => {
	const data = [
		{
			"name":"#Python",
			"icon": "fab fa-python",
			"description":"I have been using Python on my own project on Github for a year and practice it daily on Hackerrank. Python is my love language.",
		},
		{
			"name":"#Java",
			"icon": "fab fa-java",
			"description":"This is my first programming language. Java language helped me start my career as a software developer. I still practice Java skills till now.",
		},
		{
			"name":"#JavaScript",
			"icon": "fab fa-js",
			"description":"I have just used JavaScript for a couple months, but it is a powerful language with many amazing frameworks. I am so eager to know more about it.",
		},
		{
			"name":"#Machine Learning",
			"icon": "fas fa-robot",
			"description":"I like interesting tech. Machine Learning is one of them. I studied many Machine Learning videos from Coursera and made my own chatbot.",
		},
	]
	return (

		<section className={`pt-page pt-page-4 service_area sec_pad ${props.active === "service"? 'pt-page-current': ''}`} id="service">
			<div className="container">
				<div className="section_title">
					<h2 className="title mb_0">my service</h2>
				</div>
				<div className="row service_info">
					{data.map((skills, key) => {
						return (
							<Skills key={key} skills={skills} />
						)
					})}
				</div>
			</div>
		</section>
	);
}

export default ServiceSection;