"use client";

import { Button, Card, CardBody, Input, Textarea, Link } from "@heroui/react";
import { PaperAirplaneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import NavbarComponent from "@/components/navbar";
import ChatButton from "@/components/chat-button";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("weBIslcs0-X4ajm_O");
  }, []);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formRef.current) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        "service_o1ow8qd", // Your service ID
        "template_5sx52yc", // Your template ID
        formRef.current
      );

      console.log("SUCCESS!", result.text);

      // Reset form
      setFormData({ name: "", email: "", message: "" });

      alert("Message sent successfully! I will get back to you soon.");
    } catch (error) {
      console.log("FAILED...", error);
      alert("Failed to send the message, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <EnvelopeIcon className="h-5 w-5" />,
      label: "Email",
      value: "lionelhu33@gmail.com",
      href: "mailto:lionelhu33@gmail.com",
      color: "primary" as const,
    },
    {
      icon: <MapPinIcon className="h-5 w-5" />,
      label: "Location",
      value: "Burlingame, California",
      href: null,
      color: "secondary" as const,
    },
    {
      icon: <FaGithub className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/33lenoil",
      href: "https://github.com/33lenoil",
      color: "success" as const,
    },
    {
      icon: <FaLinkedinIn className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/lionel-hu",
      href: "https://www.linkedin.com/in/lionel-hu/",
      color: "warning" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Chat Button */}
      <ChatButton />

      {/* Navbar */}
      <NavbarComponent currentPage="contact" />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Get In Touch</h1>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            Let&apos;s discuss opportunities, collaborations, or just say hello! I&apos;m always
            excited to connect with fellow developers and potential collaborators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="group hover:scale-105 transition-transform duration-200"
                >
                  <CardBody className="p-6">
                    {info.href ? (
                      <Link
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                      >
                        <div className={`p-2 rounded-lg bg-${info.color}/10`}>
                          <div className={`text-${info.color}`}>{info.icon}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-default-500">{info.label}</div>
                          <div className="text-sm">{info.value}</div>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${info.color}/10`}>
                          <div className={`text-${info.color}`}>{info.icon}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-default-500">{info.label}</div>
                          <div className="text-sm text-foreground">{info.value}</div>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Map */}
            <Card>
              <CardBody className="p-0">
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1234567890!2d-122.3456789012!3d37.5841234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e1234567890%3A0x1234567890abcdef!2sBurlingame%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1718834928858!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Burlingame, CA Location"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    label="Name"
                    placeholder="Your full name"
                    value={formData.name}
                    onValueChange={(value) => handleInputChange("name", value)}
                    isRequired
                    variant="bordered"
                    className="w-full"
                  />
                  <Input
                    name="email"
                    label="Email"
                    placeholder="your.email@example.com"
                    type="email"
                    value={formData.email}
                    onValueChange={(value) => handleInputChange("email", value)}
                    isRequired
                    variant="bordered"
                    className="w-full"
                  />
                </div>

                <Textarea
                  name="message"
                  label="Message"
                  placeholder="Tell me about your project, idea, or just say hello!"
                  value={formData.message}
                  onValueChange={(value) => handleInputChange("message", value)}
                  isRequired
                  variant="bordered"
                  minRows={4}
                  className="w-full"
                />

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  isLoading={isLoading}
                  startContent={!isLoading && <PaperAirplaneIcon className="h-5 w-5" />}
                  className="w-full"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-default-200">
                <p className="text-sm text-default-500 text-center">
                  Prefer email? Reach me directly at{" "}
                  <Link href="mailto:lionelhu33@gmail.com" className="text-primary hover:underline">
                    lionelhu33@gmail.com
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="pt-2 text-center text-sm text-default-500">Built by Lionel Hu</div>
      </main>
    </div>
  );
}
