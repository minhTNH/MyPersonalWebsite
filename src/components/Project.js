import React from 'react';

const Project = (props) => {
	return (
		<div className="col-lg-4 col-md-6 col-xs-12 gallery-item">
			<div className="gallery_info">
				<div className="gallery_img">
					<img src={props.project.image} alt=""/>
					<div className="hover_content">
						<div className="hover_text">
							<h3>{props.project.name}</h3>
							<p>{props.project.description}</p>
							<div className="border_line"></div>
							<div className="category">
								<p>Source Code:</p>
								<a href={props.project.url} target="_blank" rel="noopener noreferrer">{props.project.tag}</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Project;
