import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Flipkart Stories</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Press</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Corporate Information</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">HELP</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Payments</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Shipping</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Cancellation & Returns</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Report Infringement</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">POLICY</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Return Policy</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Terms Of Use</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Security</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Privacy</Link></li>
              <li><Link to="#" className="text-sm text-background/80 hover:text-background transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">CONTACT US</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-background/80">
                <Mail className="w-4 h-4" />
                support@flipkart.com
              </li>
              <li className="flex items-center gap-2 text-sm text-background/80">
                <Phone className="w-4 h-4" />
                1800-202-9898
              </li>
              <li className="flex items-start gap-2 text-sm text-background/80">
                <MapPin className="w-4 h-4 mt-0.5" />
                Flipkart Internet Pvt Ltd,<br />
                Bangalore, Karnataka
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              © 2026 Flipkart Clone. For demonstration purposes only.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payment Methods" className="h-6 opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
