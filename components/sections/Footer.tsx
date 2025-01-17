import { NewsletterForm } from "./NewsletterForm"
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react"

const socialLinks = [
  {
    icon: <Facebook className="h-5 w-5" />,
    href: "https://facebook.com",
    label: "Facebook"
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "https://twitter.com",
    label: "Twitter"
  },
  {
    icon: <Instagram className="h-5 w-5" />,
    href: "https://instagram.com",
    label: "Instagram"
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://linkedin.com",
    label: "LinkedIn"
  }
]

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    text: "contact@example.com",
    href: "mailto:info@somalicraft.com"
  },
  {
    icon: <Phone className="h-5 w-5" />,
    text: "+252 90 7366124",
    href: "tel:+252907366124"
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    text: "Somalia",
    href: "https://maps.google.com"
  }
]

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-muted-foreground">
              We are dedicated to providing high-quality tech education and mentorship to help you achieve your career goals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 