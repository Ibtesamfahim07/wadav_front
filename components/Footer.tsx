import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-primary">DEALHUB</span>
            </a>
            <p className="text-sm text-muted-foreground mb-4">
              © {currentYear} Dealhub, LLC. All Rights Reserved.
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Dealhub</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Term Of Use</a></li>
              <li><a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Column 2 - Special Events */}
          <div>
            <h3 className="font-semibold mb-4">Special Events</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/events/halloween" className="text-muted-foreground hover:text-primary transition-colors">Halloween</a></li>
              <li><a href="/events/mothers-day" className="text-muted-foreground hover:text-primary transition-colors">Mother's Day</a></li>
              <li><a href="/events/labor-day" className="text-muted-foreground hover:text-primary transition-colors">Labor Day</a></li>
              <li><a href="/events/fathers-day" className="text-muted-foreground hover:text-primary transition-colors">Father's Day</a></li>
              <li><a href="/events/black-friday" className="text-muted-foreground hover:text-primary transition-colors">Black Friday</a></li>
              <li><a href="/events/cyber-monday" className="text-muted-foreground hover:text-primary transition-colors">Cyber Monday</a></li>
              <li><a href="/events/christmas" className="text-muted-foreground hover:text-primary transition-colors">Christmas</a></li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="/media-kit" className="text-muted-foreground hover:text-primary transition-colors">Media Kit</a></li>
              <li><a href="/students" className="text-muted-foreground hover:text-primary transition-colors">Dealhub For Students</a></li>
              <li><a href="/discounts/student" className="text-muted-foreground hover:text-primary transition-colors">Student Discounts</a></li>
              <li><a href="/discounts/military" className="text-muted-foreground hover:text-primary transition-colors">Military Discounts</a></li>
            </ul>
          </div>

          {/* Column 4 - Popular Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/category/fashion" className="text-muted-foreground hover:text-primary transition-colors">Fashion</a></li>
              <li><a href="/category/electronics" className="text-muted-foreground hover:text-primary transition-colors">Electronics</a></li>
              <li><a href="/category/travel" className="text-muted-foreground hover:text-primary transition-colors">Travel</a></li>
              <li><a href="/category/food-drinks" className="text-muted-foreground hover:text-primary transition-colors">Food & Dining</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              DEALHUB is a penny-pinching site that handles your budget by delivering coupons & promo codes for online stores without hidden charges and prolonged processes. All coupon codes are temporary and may expire later. Saving tips & thrifty knacks to ensure you chop the expenditure for savvy shopping are given by our e-commerce experts & are visible on our blog page.
            </p>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>Affiliate Disclosure: If You Buy A Product Or Service After Clicking One Of Our Links On This Page, We May Be Paid A Commission.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;