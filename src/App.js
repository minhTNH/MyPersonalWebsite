import React, {Component} from 'react';
import Logo from './images/new-logo.png';

import Header from './components/Header';
import HomeSection from './components/HomeSection';
import PortfolioSection from './components/PortfolioSection';
import ServiceSection from './components/ServiceSection';
import ContactSection from './components/ContactSection';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeID: 'home',
      mobileToggle: ''
    }
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  getIdSection = (id) => {
    this.toggleMobileMenu();
    this.setState((state) => {
      return {activeID: id};
    });
  }

  toggleMobileMenu() {
      if (this.state.mobileToggle === '') {
          this.setState((state) => {
            return {mobileToggle: 'active'};
          });
      } else {
          this.setState((state) => {
            return {mobileToggle: ''};
          });
      }
  }

  render() {
    let displaySection;
    switch(this.state.activeID) {
      case "portfolio":
        displaySection = <PortfolioSection active={this.state.activeID} />
        break;
      case "service":
        displaySection = <ServiceSection active={this.state.activeID} />
        break;
      case "contact":
        displaySection = <ContactSection active={this.state.activeID} />
        break;
      default:
        displaySection = <HomeSection active={this.state.activeID} />;
    }
    return (
      <div>
        <div className="page">
          <Header getIdSection={this.getIdSection.bind(this)} mobileToggle={this.state.mobileToggle} />
          <div className="mobile_header mobile_visible">
            <div className="logo">
                <img src={Logo} alt="logo"/>
            </div>
            <a className={`menu-toggle ${this.state.mobileToggle === "active"? 'open': ''}`} onClick={this.toggleMobileMenu}>
              <i className="fa fa-bars"></i>
              <i className="fa fa-times"></i>
            </a>
          </div>
          <div className="main_body">
            <div className="page_wrapper">
              <div className="subpages" id="pt-main">
                {displaySection}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
