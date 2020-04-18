import React from 'react';
import Links from './Links';
import Avatar from '../images/Avatar.png';

const HomeSection = (props) => {
  return (
    <section className={`pt-page pt-page-1 home_area sec_pad ${props.active === "home"? 'pt-page-current': ''}`} id="home">
      <div className="dot_shape">
        <div className="shap shape_one"></div>
        <div className="shap shape_two"></div>
        <div className="shap shape_three"></div>
        <div className="shap shape_four"></div>
        <div className="shap shape_five"></div>
        <div className="shap shape_six"></div>
        <div className="triangle shape_seven"></div>
        <div className="triangle shape_eight"></div>
        <div className="triangle shape_nine"></div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="personal_img">
              <img src={Avatar} className="img_two" alt="avatar" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="personal_details">
              <h6 className="text_upparcase">Welcome to my website!</h6>
              <h1>This is Minh Nguyen</h1>
              <div className="cd-intro">
                <h1 className="cd-headline clip is-full-width">

                  <span className="cd-words-wrapper">
                    <b className="is-visible">Software Developer</b>
                    <b>Python Programmer</b>
                    <b>Java Developer</b>
                    <b>Application Programmer</b>
                    <b>JavaScript Developer</b>
                    <b>Full-Stack Developer</b>
                  </span>
                </h1>
              </div>
              <p>- Hi, I have been working as a software developer for the past 3 years.</p>
              <p>- Programming is my field and problem solving is my joy in spare time. You can check my Hackerrank page for more details.</p>
              <p>- I often spend all my time researching interesting technology. I have researched Learning Machine for chatbot named Cheri. My first intention was to deploy Cheri here on my website but I could not afford to lease a decent server, it's quite expensive!! However, you can check my Github for the Cheri's code. I hope to show my Cheri to you soon.</p>
              <p>- Besides programming, photography is a second hobby. I love walking around Ontario parks and shooting beautiful pictures as much as possible.</p>
              <p>- Please feel free to contact with me for discussing your project.</p>
              <Links />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
