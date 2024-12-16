import React, { useState } from 'react';
import { FaEnvelope, FaInfoCircle, FaCompress, FaQrcode, FaCode, FaKey, FaHome, FaDollarSign, FaTools, FaFileAlt, } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Menu() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.menuContainer, width: isOpen ? '250px' : '60px' }}>
        <div style={styles.header}>
          {isOpen && <h2 style={styles.title}>Menu</h2>}
          <button onClick={toggleMenu} style={styles.toggleButton}>
            {isOpen ? '<' : '>'}
          </button>
        </div>
        <ul style={styles.menuList}>
          
          <MenuItem icon={<FaKey />} label={<Link to="/MD5Generator" style={styles.linkStyle}>Mã hóa MD5</Link>} isOpen={isOpen} />
          <MenuItem icon={<FaHome />} label={<Link to="/trangtru" style={styles.linkStyle}>Trang Chủ</Link>} isOpen={isOpen} />
          <MenuItem icon={<FaFileAlt />} label={<Link to="/fileMD5" style={styles.linkStyle}>Băm File</Link>} isOpen={isOpen} />
          <MenuItem icon={<FaCode />} label={<Link to="/chukyso" style={styles.linkStyle}>chữ ký số</Link>} isOpen={isOpen} />
          
         
        </ul>
      </div>
    </div>
  );  
}

function MenuItem({ icon, label, isOpen }) {
  return (
    <li 
      style={isOpen ? styles.menuItem : styles.menuItemCollapsed} 
      title={isOpen ? '' : label}  
    >
      <span style={styles.iconContainer}>{icon}</span>
      {isOpen && <span style={styles.label}>{label}</span>}
    </li>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh', // Đặt chiều cao container chính là 100% chiều cao trang
  },
  menuContainer: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRight: '1px solid #ddd',
    height: '100%', // Đảm bảo menuContainer có chiều cao đầy đủ
    width: '250px', // Set a fixed width for consistency
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkStyle: {
    color: '#28a745', // Màu giống như các mục menu khác
    textDecoration: 'none', // Bỏ gạch chân
  },
  title: {
    marginBottom: '20px',
    color: '#333', // Match the MD5 generator title color
  },
  toggleButton: {
    backgroundColor: '#28a745', // Màu nền xanh lá cây
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '50%',
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '20px',
    display: 'flex', // Use flexbox for horizontal layout
    flexWrap: 'wrap', // Allow items to wrap to the next line if necessary
    gap: '10px', // Space between items
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    cursor: 'pointer',
    color: '#28a745', // Change color to green for the menu items
    transition: 'padding 0.3s ease',
    border: '1px solid transparent', // Add border for separation
    borderRadius: '5px', // Add border radius
  },
  menuItemCollapsed: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0',
    cursor: 'pointer',
    color: '#28a745', // Color for collapsed items
    textAlign: 'center',
    border: '1px solid transparent',
    borderRadius: '5px',
    margin: '10px 0',
    width: '40px',
    height: '40px',
  },
  iconContainer: {
    fontSize: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: '10px',
    fontSize: '1rem',
    color: '#666', // Match label color with MD5 generator
  },
};

export default Menu;
