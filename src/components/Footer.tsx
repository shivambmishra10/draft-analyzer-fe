import { Row, Col, Input, Button } from "antd";

const Footer = () => {
  return (
    <footer className="bg-white mt-12 pt-10 px-8 pb-6 shadow-inner">
      <Row gutter={[32, 24]} className="text-sm text-gray-700">
        {/* Logo Section */}
        <Col xs={24} md={4}>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://www.civis.vote/assets/images/navlogo.png"
                alt="Logo"
                className="h-10 object-contain"
              />
              {/* <span className="font-bold text-xl text-blue-600">Civis</span> */}
            </div>
          </div>
        </Col>

        {/* Quick Links */}
        <Col xs={24} md={4}>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <div className="flex flex-col gap-1">
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Blog</a>
          </div>
        </Col>

        {/* Resources */}
        <Col xs={24} md={4}>
          <h3 className="font-semibold mb-2">Resources</h3>
          <div className="flex flex-col gap-1">
            <a href="#" className="hover:underline">Documentation</a>
            <a href="#" className="hover:underline">API Access</a>
            <a href="#" className="hover:underline">Community</a>
            <a href="#" className="hover:underline">Support</a>
            <a href="#" className="hover:underline">Feedback</a>
          </div>
        </Col>

        {/* Social Media */}
        <Col xs={24} md={4}>
          <h3 className="font-semibold mb-2">Stay Connected</h3>
          <div className="flex flex-col gap-1">
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">LinkedIn</a>
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">YouTube</a>
          </div>
        </Col>

        {/* Newsletter */}
        <Col xs={24} md={8}>
          <h3 className="font-semibold mb-2">Subscribe</h3>
          <p className="text-gray-500 mb-2">Join our newsletter to stay updated.</p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full"
            />
            <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
              Subscribe
            </Button>
          </div>
        </Col>
      </Row>

      {/* Bottom Section */}
      <div className="mt-10 border-t pt-4 text-xs text-gray-400 flex flex-col md:flex-row justify-between">
        <p>&copy; {new Date().getFullYear()} Civis. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Cookies Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
