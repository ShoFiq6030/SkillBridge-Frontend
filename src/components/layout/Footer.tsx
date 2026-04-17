import Link from "next/link";
import Image from "next/image";
import LogoPng from "../../../public/skillBridge-logo.png";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-card text-card-foreground py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={LogoPng}
                alt="SkillBridge Logo"
                width={80}
                height={80}
                className="max-h-10 dark:invert"
              />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              SkillBridge is the leading platform for finding expert tutors in
              any subject. We connect learners with teachers to foster knowledge
              sharing and academic excellence.
            </p>
            <div className="mt-6 flex gap-2">
              <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                <Link href="#">
                  <Facebook size={18} />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                <Link href="#">
                  <Twitter size={18} />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                <Link href="#">
                  <Instagram size={18} />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                <Link href="#">
                  <Linkedin size={18} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tutors"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Join as Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter (Optional) */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Email: support@skillbridge.com
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: +1 (234) 567-890
            </p>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
