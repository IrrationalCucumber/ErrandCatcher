import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ menuItems, children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="container">
            <div style={{ width: isOpen ? "200px" : "90px" }} className="sidebarr">
                <div style={{ justifyContent: isOpen ? "end" : "flex-start" }} className="top_section">
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <MenuIcon style={{ cursor: "pointer" }} onClick={toggle} />
                    </div>
                </div>
                {menuItems.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeclassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
                            {item.name}
                        </div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>

    );
}

export default Sidebar;
