import React, {Component} from 'react';

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
    }
  }

  getIdSection = (id) => {
    this.setState((state) => {
      return {activeID: id};
    });
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
          <Header getIdSection={this.getIdSection.bind(this)} />
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
