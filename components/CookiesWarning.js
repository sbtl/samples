import React, { Component } from 'react';

class CookiesWarning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWarningAccepted: true
    };

    this.acceptCookiesWarning = this.acceptCookiesWarning.bind(this);
  }

  componentWillMount() {
    if (typeof(Storage) !== "undefined") {
      let status = localStorage.getItem('CookiesWarningStatus');

      if (!status || status == 0) {
        localStorage.setItem('CookiesWarningStatus', 0);

        this.setState({
          isWarningAccepted: false
        });
      }
    }
  }

  acceptCookiesWarning() {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem('CookiesWarningStatus', 1);

      this.setState({
        isWarningAccepted: true
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.isWarningAccepted ?
          <div className="cookies-warning">
            <div className="content">
              <p className="copy">
                PodMe använder cookies för en bättre upplevelse för våra användare.<br />
                Genom att fortsätta använda vår tjänst samtycker du till vår användning av cookies.
              </p>

              <div className="action">
                <button className="icon-button -close" onClick={this.acceptCookiesWarning}></button>
              </div>
            </div>
          </div>
        : null}
      </div>
    )
  }
}

export default CookiesWarning;
