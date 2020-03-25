import React from 'react';

const Links = (props) => {

	const data = [
		{
			'icon':'fab fa-linkedin-in',
			'link':'https://www.linkedin.com/in/minh-tech',
		},
		{
			'icon':'fab fa-github',
			'link':'https://github.com/minh-tech',
		},
		{
			'icon':'fab fa-hackerrank',
			'link':'https://www.hackerrank.com/minhtech',
		}
	]
  
  return (
  <div className="social_links">
  	{
			data.map((data, key) => {
				return (
					<a key={key} href={data.link} target="_blank" rel="noopener noreferrer"><i className={data.icon} /></a>
				)
			})
		}
  </div>
  );
}

export default Links;
