import React from 'react';

const Skills = (props) => {
	return (
		<div className="col-lg-5 col-md-6 mb_100">
			<div className="service_item">
				<div className="service_content">
					<div className="round_icon">
						<i className={props.skills.icon} aria-hidden="true"></i>
					</div>
					<h3>{props.skills.name}</h3>
					<p>{props.skills.description}</p>
				</div>
			</div>
		</div>
	);
}
export default Skills;
