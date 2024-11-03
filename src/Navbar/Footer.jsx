// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import './App.scss'; // Ensure this file contains necessary styles

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <Container>
//         <Row>
//           <Col md={4}>
//             <h5>About Us</h5>
//             <p>
//               We are a team of passionate individuals committed to delivering the best products and services. Our mission is to enhance your shopping experience with quality and excellence.
//             </p>
//           </Col>
//           <Col md={4}>
//             <h5>Quick Links</h5>
//             <ul className="footer-links">
//               <li><a href="/">Home</a></li>
//               <li><a href="/shop">Shop</a></li>
//               <li><a href="/blog">Blog</a></li>
//               <li><a href="/contact">Contact</a></li>
//             </ul>
//           </Col>
//           <Col md={4}>
//             <h5>Follow Us</h5>
//             <div className="social-icons">
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
//             </div>
//           </Col>
//         </Row>
//         <div className="footer-bottom">
//           <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;





import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './App.scss'; // Ensure this file contains necessary styles

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are a dedicated team passionate about making note-taking efficient and effective. Our mission is to enhance your study experience through innovative tools and resources.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="../NoteList/AddNote">My Notes</a></li>
              <li><a href="/MoreInfo">Resources</a></li>
              <li><a href="../pages/Contact">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Study Notes. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
