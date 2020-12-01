import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {

    renderContent(){
        switch (this.props.auth){
            case null:
                return "Still deciding"

            case false:
                return "i'm logged out"

            default:
                return "i'm logged in"


        }
    }
    render(){
        
        return (
            <nav>
                <div className="nav-wrapper black">
                    <a className="left brand-logo">
                        Emaily
                    </a>
                    <ul className="right">
                        <li>
                            {this.renderContent()}
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }){
    return { auth };
}

export default connect(mapStateToProps)(Header);