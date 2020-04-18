import React from 'react';
import Links from './Links';
import Background from '../images/contact_bg.jpg';

const SectionStyle = {
  backgroundImage: 'url(' + Background + ')',
};

const ContactSection = (props) => {
	return (
		<section style={SectionStyle} className={`pt-page pt-page-5 contact_area sec_pad ${props.active === "contact"? 'pt-page-current': ''}`} id="contact">
			<div className="contact">
				<div className="container">
					<div className="section_title mb_50">
						<h2 className="title mb_0">Contact With Me</h2>
					</div>
					<div className="row flex-row-reverse contact_div">
						<div className="col-lg-6">
							<div className="contact_info">
								<div className="sec_contact_title">
									<h4 className="contact_title">Get In Touch</h4>
									<p>I am so eager to work with you. Please send me an email and I will contact you later. Thank you!</p>
								</div>
								<div className="info_item">
									<h4 className="contact_title">Address</h4>
									<p>Toronto, ON<br/>Canada. </p>
								</div>
								<div className="info_item">
									<h4 className="contact_title">Contact Information</h4>
									<p><span>Email: </span><a href="mailto:contact@minhtech.dev">contact@minhtech.dev</a></p>
									<p><span>Gmail: </span><a href="mailto:minh.a.h.nguyen1@gmail.com">minh.a.h.nguyen1@gmail.com</a></p>
								</div>
								<Links />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ContactSection;
