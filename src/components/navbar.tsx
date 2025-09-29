"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Switch,
} from "@heroui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface NavbarComponentProps {
  currentPage?: string;
}

export default function NavbarComponent({ currentPage }: NavbarComponentProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { name: "About", href: "/", external: false },
    { name: "Chat with AI", href: "/chat", external: false },
    { name: "Resume", href: "/resume", external: false },
    { name: "Portfolio", href: "/portfolio", external: false },
    { name: "Photography", href: "/photography", external: false },
    { name: "Contact", href: "/contact", external: false },
    { name: "GitHub", href: "https://github.com/33lenoil", external: true },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/lionel-hu/", external: true },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarBrand>
        <Link href="/" className="text-xl font-semibold text-foreground">
          Lionel Hu | Portfolio
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" color="foreground" className={currentPage === "about" ? "font-bold" : ""}>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/chat"
            color="foreground"
            className={currentPage === "chat" ? "font-bold" : ""}
          >
            Chat with AI
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/resume"
            color="foreground"
            className={currentPage === "resume" ? "font-bold" : ""}
          >
            Resume
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/portfolio"
            color="foreground"
            className={currentPage === "portfolio" ? "font-bold" : ""}
          >
            Portfolio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/photography"
            color="foreground"
            className={currentPage === "photography" ? "font-bold" : ""}
          >
            Photography
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/contact"
            color="foreground"
            className={currentPage === "contact" ? "font-bold" : ""}
          >
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="https://github.com/33lenoil"
            target="_blank"
            rel="noopener noreferrer"
            color="foreground"
          >
            GitHub
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="https://www.linkedin.com/in/lionel-hu/"
            target="_blank"
            rel="noopener noreferrer"
            color="foreground"
          >
            LinkedIn
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {mounted && (
            <Switch
              isSelected={theme === "dark"}
              onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
              size="lg"
              color="primary"
              startContent={<SunIcon className="h-4 w-4" />}
              endContent={<MoonIcon className="h-4 w-4" />}
            />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
