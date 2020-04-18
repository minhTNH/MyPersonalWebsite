import React from 'react';
import Project from './Project';
import Background from '../images/portfolio-bg.jpg';

const SectionStyle = {
  backgroundImage: 'url(' + Background + ')',
};

const PortfolioSection = (props) => {
	const data = [
		{
			"name": "Virtual Assistant - Cheri",
			"image": require('../images/portfolio-img1.jpg'),
			"description": "Answer user's questions, change emotions based on questions and perform some functions. First time I did it by Django, after that I converted it to API service by Flask.",
			"tag": "Python, Flask Framework",
			"url": "https://github.com/minh-tech/MyOnlineAssistant-API",
		},
		{
			"name": "Blockchain - Marketplace",
			"image": require('../images/portfolio-img5.jpg'),
			"description": "This is my study project for blockchain. People can sell and buy items by ethereum.",
			"tag": "Solidity, JavaScript, React",
			"url": "https://github.com/minh-tech/Blockchain-Marketplace",
		},
		{
			"name": "Keylogger",
			"image": require('../images/portfolio-img2.jpg'),
			"description": "Logging user's input from a keyboard on Windows 10",
			"tag": "Python, Windows 10",
			"url": "https://github.com/minh-tech/keylogger-MinhTech",
		},
		{
			"name": "ARP Spoofing",
			"image": require('../images/portfolio-img3.jpg'),
			"description": "Interfere other's wifi.",
			"tag": "Python, Linux",
			"url": "https://github.com/minh-tech/ArpSpoofing-MinhTech",
		},
		{
			"name": "Vernam Cipher",
			"image": require('../images/portfolio-img4.jpg'),
			"description": "Using Vernam algorithm to encrypt plain text.",
			"tag": "Python, Cryptography",
			"url": "https://github.com/minh-tech/VernamEncryption",
		},
	]

	return (
		<section style={SectionStyle} className={`pt-page pt-page-3 portfolio_area sec_pad ${props.active === "portfolio"? 'pt-page-current': ''}`} id="portfolio">
			<div className="container">
				<div className="section_title mb_50">
					<h2 className="title mb_0">What I Have Done</h2>
				</div>
				<div id="gallery" className="row portfolio_gallery">
					{
						data.map((project, key) => {
							return (
								<Project key={key} project={project} />
							)
						})
					}
				</div>
			</div>
		</section>
	);
}

export default PortfolioSection;
