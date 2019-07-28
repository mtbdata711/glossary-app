// import React from 'react';
// import './Search.css'
// import SearchButton from './SearchButton'
// import { withRouter } from "react-router-dom";
// class Search extends React.Component {
//     state = { term: '' }
//     onInputChange = (event) => {
//         this.setState({ term: event.target.value })
//     };

//     onFormSubmit = event => {
//         event.preventDefault();
//         this.props.onFormSubmit(this.state.term);

//     };
//     conponentDidMount() {
//         (function () {
//             var cx = '111:xxx';
//             var gcse = document.createElement('script');
//             gcse.type = 'text/javascript';
//             gcse.async = true;
//             gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
//             var s = document.getElementsByTagName('script')[0];
//             s.parentNode.insertBefore(gcse, s);
//         })();
//     }
//     render() {
//         return (
//             <div>
//             <div className="search">
//                 <img alt="" src="http://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png" style={{width:100, height:40}}/>

//                         <input type="text"
//                             value={this.state.term}
//                             onChange={this.onInputChange} />

// </div>

//                 <SearchButton />
//             </div>)
//     }
// }

// export default Search;
import React from "react";
import "./Search.css";
import SearchButton from "./SearchButton";
import { withRouter } from "react-router-dom";

class Search extends React.Component {
  state = { term: "" };
  onInputChange = event => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const location = `/search/${this.state.term}`;

    this.props.history.push(location);
    this.props.history.replace(location);
  };

  render() {
    //         return (
    //             <div className="search-bar ui segment">
    //                 <form onSubmit={this.onFormSubmit} className="ui form">
    //                     <div className="field">

    //                         <input type="text"
    //                             value={this.state.term}
    //                             placeholder='Search term'
    //                             onChange={this.onInputChange} />

    //                     </div>
    //                     <SearchButton />
    //                 </form>z

    //             </div>)
    //     }
    // }

    return (
      <div>
        <div className="search">
          <form onSubmit={this.onFormSubmit} className="ui form">
            <input
              type="text"
              value={this.state.term}
              placeholder="Search term"
              onChange={this.onInputChange}
            />

            <SearchButton />
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Search);
