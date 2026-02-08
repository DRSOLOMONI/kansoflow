import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Case Studies", to: "/case-studies" },
    { label: "Contact", to: "/contact" },
  ],
  Resources: [
    { label: "Insights", to: "/insights" },
    { label: "Privacy Policy", to: "#" },
    { label: "Terms of Service", to: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-primary/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="font-heading text-xl font-bold">
              <span className="text-foreground">Kanso</span>
              <span className="text-primary ml-1.5">Flow</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
              Transforming complex workflows into elegant, automated solutions. 
              Simplicity is not the absence of complexity—it's mastery of it.
            </p>
            <div className="flex gap-4 mt-6">
              {[Linkedin, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kanso Flow. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Complexity, Simplified.
          </p>
        </div>
      </div>
    </footer>
  );
}
